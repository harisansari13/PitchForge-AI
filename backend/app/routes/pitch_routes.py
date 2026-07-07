"""
Pitch routes — all pitch generation, retrieval, and export endpoints.

Each endpoint is registered both with and without the ``/api`` prefix so the
backend works whether the frontend targets the root or ``/api`` path.
"""
import re
from io import BytesIO
from xml.sax.saxutils import escape

from fastapi import APIRouter, HTTPException, Query, status
from fastapi.responses import StreamingResponse
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

from app.controllers.pitch_controller import PitchController
from app.models.pitch import (
    CompetitorRequest,
    ExportRequest,
    PitchGenerationRequest,
    PitchIdRequest,
    SWOTRequest,
    ScoreRequest,
    ValuationRequest,
)

router = APIRouter(tags=["PitchForge AI"])


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _raise_if_failed(result: dict, not_found_msg: str = "Resource not found"):
    """Raise an HTTPException when the controller returns a failure response."""
    if not result.get("success"):
        error = result.get("error", not_found_msg)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=error)


def _safe_text(value) -> str:
    """Escape a value for safe inclusion in a PDF paragraph."""
    return escape(str(value or ""))


# ---------------------------------------------------------------------------
# Pitch generation
# ---------------------------------------------------------------------------

@router.post("/generate-pitch", status_code=status.HTTP_201_CREATED)
@router.post("/api/generate-pitch", status_code=status.HTTP_201_CREATED)
async def generate_pitch(request: PitchGenerationRequest):
    """Generate an AI-powered pitch from idea, industry, and revenue model."""
    return PitchController.generate_pitch(
        request.startup_idea, request.industry, request.revenue_model
    )


@router.post("/generate-score")
@router.post("/generate-scores")
@router.post("/api/generate-score")
@router.post("/api/generate-scores")
async def generate_score(request: ScoreRequest):
    """Generate innovation, demand, scalability, and investor appeal scores."""
    result = PitchController.generate_scores(request.pitch_id)
    _raise_if_failed(result)
    return result


@router.post("/generate-swot")
@router.post("/api/generate-swot")
async def generate_swot(request: SWOTRequest):
    """Generate a SWOT analysis for an existing pitch."""
    result = PitchController.generate_swot(request.pitch_id)
    _raise_if_failed(result)
    return result


@router.post("/generate-competitors")
@router.post("/api/generate-competitors")
async def generate_competitors(request: CompetitorRequest):
    """Generate a competitor analysis for an existing pitch."""
    result = PitchController.generate_competitors(request.pitch_id)
    _raise_if_failed(result)
    return result


@router.post("/generate-valuation")
@router.post("/api/generate-valuation")
async def generate_valuation(request: ValuationRequest):
    """Generate a valuation estimate for an existing pitch."""
    result = PitchController.generate_valuation(request.pitch_id)
    _raise_if_failed(result)
    return result


# ---------------------------------------------------------------------------
# Retrieval
# ---------------------------------------------------------------------------

@router.get("/pitch/{pitch_id}")
@router.get("/api/pitch/{pitch_id}")
async def get_pitch(pitch_id: str):
    """Retrieve the full pitch document by ID."""
    result = PitchController.get_pitch_detail(pitch_id)
    _raise_if_failed(result)
    return result


@router.get("/history")
@router.get("/api/history")
async def get_history(
    limit: int = Query(10, ge=1, le=50),
    skip: int = Query(0, ge=0),
):
    """Return a paginated list of recent pitches (newest first)."""
    return PitchController.get_history(limit, skip)


# ---------------------------------------------------------------------------
# PDF export
# ---------------------------------------------------------------------------

@router.post("/export-pdf")
@router.post("/api/export-pdf")
async def export_pdf(request: ExportRequest):
    """Generate and stream a PDF report for an existing pitch."""
    result = PitchController.get_pitch_detail(request.pitch_id)
    _raise_if_failed(result)

    pitch = result["data"]
    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54,
    )
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="PitchTitle",
            parent=styles["Title"],
            textColor=colors.HexColor("#111827"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading2"],
            textColor=colors.HexColor("#2563eb"),
            spaceBefore=12,
        )
    )

    story = [
        Paragraph(_safe_text(pitch.get("startup_name", "Startup")), styles["PitchTitle"]),
        Paragraph(
            "Investor-ready startup pitch generated by PitchForge AI",
            styles["Normal"],
        ),
        Spacer(1, 0.2 * inch),
    ]

    for title, key in [
        ("Elevator Pitch", "elevator_pitch"),
        ("Problem Statement", "problem_statement"),
        ("Solution", "solution"),
        ("Business Model", "business_model"),
        ("Market Opportunity", "market_opportunity"),
        ("Investor Summary", "investor_summary"),
    ]:
        story.append(Paragraph(_safe_text(title), styles["Section"]))
        story.append(Paragraph(_safe_text(pitch.get(key, "")), styles["BodyText"]))

    story.append(Paragraph("Revenue Streams", styles["Section"]))
    for item in pitch.get("revenue_streams") or []:
        story.append(Paragraph(_safe_text(f"• {item}"), styles["BodyText"]))

    # Scores table
    if pitch.get("scores"):
        sc = pitch["scores"]
        score_rows = [
            ["Metric", "Score"],
            ["Innovation", str(sc.get("innovation_score", "—"))],
            ["Market Demand", str(sc.get("market_demand_score", "—"))],
            ["Scalability", str(sc.get("scalability_score", "—"))],
            ["Investor Appeal", str(sc.get("investor_appeal_score", "—"))],
            ["Overall", str(sc.get("overall_score", "—"))],
        ]
        table = Table(score_rows, hAlign="LEFT", colWidths=[2.4 * inch, 1.2 * inch])
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#111827")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d1d5db")),
                    ("PADDING", (0, 0), (-1, -1), 8),
                ]
            )
        )
        story.append(Paragraph("Startup Score Engine", styles["Section"]))
        story.append(table)

    # Valuation
    if pitch.get("valuation"):
        val = pitch["valuation"]
        story.append(Paragraph("Valuation Estimate", styles["Section"]))
        story.append(
            Paragraph(
                _safe_text(
                    f"Low: {val.get('low_estimate')} | "
                    f"Medium: {val.get('medium_estimate')} | "
                    f"High: {val.get('high_estimate')}"
                ),
                styles["BodyText"],
            )
        )
        story.append(
            Paragraph(_safe_text(val.get("reasoning", "")), styles["BodyText"])
        )

    doc.build(story)
    buffer.seek(0)

    raw_name = pitch.get("startup_name", "pitchforge")
    safe_name = re.sub(r"[^\w\-]", "-", raw_name).strip("-") or "pitchforge"
    filename = f"{safe_name}-pitch.pdf"

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------

@router.get("/api/health")
async def api_health():
    return {"status": "ok"}
