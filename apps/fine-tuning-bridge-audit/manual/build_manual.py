from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[3]
APP_DIR = ROOT / "apps" / "fine-tuning-bridge-audit"
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_PDF = OUTPUT_DIR / "fine-tuning-bridge-audit-manual.pdf"
BEACH_IMAGE = APP_DIR / "fine-tuning-beach.png"


INK = colors.HexColor("#16241d")
MUTED = colors.HexColor("#4d6258")
TEAL = colors.HexColor("#234637")
TEAL_SOFT = colors.HexColor("#dce8dd")
SAND = colors.HexColor("#fff6d7")
SAND_DARK = colors.HexColor("#f4df8a")
COPPER = colors.HexColor("#9c7a2a")
LINE = colors.HexColor("#a8c4af")
CARD = colors.HexColor("#fbf9ef")


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="ManualTitle",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=26,
        leading=30,
        textColor=INK,
        alignment=TA_CENTER,
        spaceAfter=10,
    )
)
styles.add(
    ParagraphStyle(
        name="ManualSubtitle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=11.5,
        leading=16,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=14,
    )
)
styles.add(
    ParagraphStyle(
        name="Kicker",
        parent=styles["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=9,
        leading=11,
        textColor=COPPER,
        alignment=TA_LEFT,
        spaceAfter=4,
        tracking=1,
    )
)
styles.add(
    ParagraphStyle(
        name="SectionTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=18,
        leading=22,
        textColor=INK,
        spaceAfter=8,
        spaceBefore=4,
    )
)
styles.add(
    ParagraphStyle(
        name="SubTitle",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12.5,
        leading=15,
        textColor=TEAL,
        spaceBefore=6,
        spaceAfter=4,
    )
)
styles.add(
    ParagraphStyle(
        name="ManualBody",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=10.5,
        leading=14.5,
        textColor=MUTED,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        name="ManualBodyTight",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.7,
        leading=13,
        textColor=MUTED,
        spaceAfter=5,
    )
)
styles.add(
    ParagraphStyle(
        name="SmallNote",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8.8,
        leading=11.5,
        textColor=MUTED,
        spaceAfter=4,
    )
)


def on_page(canvas, doc):
    page_width, page_height = letter
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.7)
    canvas.line(doc.leftMargin, page_height - 42, page_width - doc.rightMargin, page_height - 42)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 8.5)
    canvas.drawString(doc.leftMargin, page_height - 32, "Crosshairs Audit Lab")
    canvas.drawRightString(page_width - doc.rightMargin, 28, f"Fine-Tuning Bridge Audit Manual  |  {canvas.getPageNumber()}")
    canvas.restoreState()


def make_doc(path: Path):
    doc = BaseDocTemplate(
        str(path),
        pagesize=letter,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.8 * inch,
        bottomMargin=0.62 * inch,
        title="Fine-Tuning Bridge Audit Manual",
        author="Phil Stilwell",
        subject="Guide to the value and use of the Fine-Tuning Bridge Audit",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="manual", frames=[frame], onPage=on_page)])
    return doc


def bullet_list(items, level=0):
    return ListFlowable(
        [
            ListItem(Paragraph(item, styles["ManualBodyTight"]), leftIndent=0)
            for item in items
        ],
        bulletType="bullet",
        start="circle" if level else "bullet",
        leftIndent=14 + level * 10,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=8,
        bulletOffsetY=2,
        spaceBefore=1,
        spaceAfter=6,
    )


def callout(title, body, tint=TEAL_SOFT):
    body_flow = [Paragraph(f"<b>{title}</b>", styles["SubTitle"]), Paragraph(body, styles["ManualBody"])]
    table = Table([[body_flow]], colWidths=[6.5 * inch])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), tint),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def two_col_rows(rows, widths=(2.05 * inch, 4.35 * inch)):
    table = Table(rows, colWidths=list(widths), hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), TEAL_SOFT),
                ("TEXTCOLOR", (0, 0), (-1, 0), INK),
                ("BOX", (0, 0), (-1, -1), 0.8, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def cover_block():
    elements = []
    elements.append(Spacer(1, 0.35 * inch))
    elements.append(Paragraph("Crosshairs Audit Lab", styles["Kicker"]))
    elements.append(Paragraph("Fine-Tuning Bridge Audit", styles["ManualTitle"]))
    elements.append(
        Paragraph(
            "A guide for sincere seekers on what this tool is for, why it matters, and how to use it honestly.",
            styles["ManualSubtitle"],
        )
    )
    elements.append(
        callout(
            "What this manual is trying to do",
            "This tool is prior, not final. It does not decide whether God exists. It helps a seeker say more clearly what fine-tuning does and does not support before larger claims inherit more confidence than they have earned.",
            tint=SAND,
        )
    )
    elements.append(Spacer(1, 0.18 * inch))
    if BEACH_IMAGE.exists():
        elements.append(Image(str(BEACH_IMAGE), width=6.45 * inch, height=2.56 * inch))
        elements.append(Spacer(1, 0.1 * inch))
        elements.append(
            Paragraph(
                "The beach analogy keeps three different shapes apart: a vast beach with one rare stack, a tiny beach with one stack, and a vast beach with stacks nearly everywhere. Much of the manual turns on that distinction.",
                styles["SmallNote"],
            )
        )
    elements.append(Spacer(1, 0.18 * inch))
    elements.append(
        two_col_rows(
            [
                [Paragraph("<b>This manual helps you</b>", styles["ManualBodyTight"]), Paragraph("<b>This manual does not do</b>", styles["ManualBodyTight"])],
                [
                    Paragraph("understand the ladder of claims, the eight bridges, the diagnosis outputs, and the most common overreaches.", styles["ManualBodyTight"]),
                    Paragraph("argue that naturalism is true, prove that design is false, or replace the wider Theism Gradient.", styles["ManualBodyTight"]),
                ],
            ],
            widths=(3.2 * inch, 3.2 * inch),
        )
    )
    elements.append(Spacer(1, 0.2 * inch))
    elements.append(
        Paragraph(
            "Best use: move through the tool slowly, keep your answers plain, and let the result become one cleaner sentence rather than one bigger conclusion.",
            styles["ManualBody"],
        )
    )
    elements.append(PageBreak())
    return elements


def section(title, kicker=None):
    elements = []
    if kicker:
        elements.append(Paragraph(kicker, styles["Kicker"]))
    elements.append(Paragraph(title, styles["SectionTitle"]))
    return elements


def build_story():
    story = []
    story.extend(cover_block())

    story.extend(section("1. Why this tool exists", "Purpose"))
    story.append(
        Paragraph(
            "Many fine-tuning arguments move too quickly. They begin with a striking fact about life-permitting conditions, then quietly slide into a much thicker conclusion: design, life-purpose, human-purpose, or even Christian purpose. The Fine-Tuning Bridge Audit slows that chain down and asks which steps have actually been earned.",
            styles["ManualBody"],
        )
    )
    story.append(
        Paragraph(
            "For a sincere seeker, that is the tool’s main value. It gives you a disciplined way to ask whether confidence is coming from evidence, from hidden assumptions, or from conclusions borrowed too early from somewhere else.",
            styles["ManualBody"],
        )
    )
    story.append(
        callout(
            "The central promise of the tool",
            "By the end, you should be able to say one honest sentence such as: fine-tuning may support a thin design hunch, or life-purpose is still only tentative, or the world-shape still pushes against a human-centered reading.",
        )
    )

    story.extend(section("2. The four claim levels"))
    story.append(
        Paragraph(
            "The tool asks you to name the exact job you want fine-tuning to do. That matters because the argument can be thin at one level and weak at a thicker level.",
            styles["ManualBody"],
        )
    )
    story.append(
        two_col_rows(
            [
                [Paragraph("<b>Claim level</b>", styles["ManualBodyTight"]), Paragraph("<b>What it says</b>", styles["ManualBodyTight"])],
                [Paragraph("Design only", styles["ManualBodyTight"]), Paragraph("Fine-tuning points to purposive calibration, but not yet to life as the target, still less to humans or Christianity.", styles["ManualBodyTight"])],
                [Paragraph("Life purpose", styles["ManualBodyTight"]), Paragraph("The universe was set so that life would emerge. This is thicker than design only.", styles["ManualBodyTight"])],
                [Paragraph("Human purpose", styles["ManualBodyTight"]), Paragraph("The universe was set for persons like us, or for some human-centered end.", styles["ManualBodyTight"])],
                [Paragraph("Christian purpose", styles["ManualBodyTight"]), Paragraph("Fine-tuning is being asked to help carry a personal or specifically Christian conclusion.", styles["ManualBodyTight"])],
            ]
        )
    )
    story.append(
        Paragraph(
            "The tool’s basic moral discipline is simple: do not let a thicker claim inherit the support of a thinner claim for free.",
            styles["ManualBody"],
        )
    )

    story.extend(section("3. The eight bridges"))
    story.append(
        Paragraph(
            "A bridge is a premise you need in order to move from one rung of the ladder to the next. The tool checks eight of them. If a bridge is missing, the conclusion should stop. If a bridge is only asserted, the conclusion may still be tentatively live, but not fully earned.",
            styles["ManualBody"],
        )
    )
    bridge_rows = [
        [Paragraph("<b>Bridge</b>", styles["ManualBodyTight"]), Paragraph("<b>What it asks</b>", styles["ManualBodyTight"])],
        [Paragraph("Narrow Range", styles["ManualBodyTight"]), Paragraph("Is the life-permitting region actually narrow, rather than just the place where observers like us happen to exist?", styles["ManualBodyTight"])],
        [Paragraph("Probability Measure", styles["ManualBodyTight"]), Paragraph("What measure over alternatives makes the life-permitting range look unlikely, and why is that measure fair?", styles["ManualBodyTight"])],
        [Paragraph("Observer Selection", styles["ManualBodyTight"]), Paragraph("What still needs explaining once we admit that observers can only observe observer-permitting regions?", styles["ManualBodyTight"])],
        [Paragraph("Impersonal Alternatives", styles["ManualBodyTight"]), Paragraph("Which live non-design explanations remain, and why do they underperform compared with design?", styles["ManualBodyTight"])],
        [Paragraph("Design Step", styles["ManualBodyTight"]), Paragraph("Why move from striking selectivity to purposive calibration rather than to unexplained selectivity?", styles["ManualBodyTight"])],
        [Paragraph("Life Target", styles["ManualBodyTight"]), Paragraph("Why think life is the target, rather than one byproduct inside a much larger physical setup?", styles["ManualBodyTight"])],
        [Paragraph("Human Target", styles["ManualBodyTight"]), Paragraph("Why think humans or moral persons are the target rather than life in general or some other end?", styles["ManualBodyTight"])],
        [Paragraph("Theistic Step", styles["ManualBodyTight"]), Paragraph("What turns generic design into anything recognizably personal, revelatory, or Christian?", styles["ManualBodyTight"])],
    ]
    story.append(two_col_rows(bridge_rows))
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        bullet_list(
            [
                "Missing means the bridge has not really been supplied yet.",
                "Asserted means the bridge has been named, but the support still has not been shown clearly.",
                "Substantiated means the bridge is both affirmed and backed with a real support note naming what is doing the work.",
            ]
        )
    )

    story.extend(section("4. The nine-step walkthrough", "Use"))
    step_text = [
        ("Step 1 - Claim", "Choose the exact conclusion you want fine-tuning to support. This stops the rest of the tool from drifting."),
        ("Step 2 - Prior", "Check identity pull, delegated trust, symmetry willingness, and mind-change willingness. These do not settle the argument, but they reveal background pressure."),
        ("Step 3 - Bridges", "Mark the eight bridges as missing, asserted, or substantiated. If you mark a bridge substantiated, say what evidence or reasoning is actually carrying it."),
        ("Step 4 - World", "Use the beach analogy to compare the actual universe with the universe each route would naturally predict."),
        ("Step 5 - Goals", "Keep target ambiguity visible by testing whether order, black holes, sparse life, abundant life, opaque ends, or humans look most plausible as the target."),
        ("Step 6 - Diagnosis", "Read the honest ceiling, the tentative ceiling, the pressure map, and the yellow pressure list."),
        ("Step 7 - Next", "Hand the result into Theism Gradient so the larger audit starts with the fine-tuning pressure already named."),
        ("Step 8 - Q&A", "Use the built-in questions when you need clarification without turning the tool into a verdict machine."),
        ("Step 9 - Report", "Export a compact summary, a Markdown version, or a structured AI prompt for further discussion."),
    ]
    for title, copy in step_text:
        story.append(Paragraph(title, styles["SubTitle"]))
        story.append(Paragraph(copy, styles["ManualBody"]))

    story.extend(section("5. Why the beach analogy matters"))
    story.append(
        Paragraph(
            "The beach analogy is valuable because ordinary fine-tuning language can hide an important difference. A universe can be life-permitting without looking like a universe aimed at life everywhere. It can also be life-aimed without clearly looking human-aimed.",
            styles["ManualBody"],
        )
    )
    story.append(
        two_col_rows(
            [
                [Paragraph("<b>Scenario</b>", styles["ManualBodyTight"]), Paragraph("<b>What it suggests</b>", styles["ManualBodyTight"])],
                [Paragraph("A - Massive beach, one rare five-high stack", styles["ManualBodyTight"]), Paragraph("A vast search space with one local success. This can fit natural emergence, sparse design, or unknown ends.", styles["ManualBodyTight"])],
                [Paragraph("B - Tiny beach, one five-high stack", styles["ManualBodyTight"]), Paragraph("A smaller arena where the success looks more central and less drowned in vast unused space.", styles["ManualBodyTight"])],
                [Paragraph("C - Massive beach, stacks nearly everywhere", styles["ManualBodyTight"]), Paragraph("Success is widespread and easy to find. This most strongly fits a clearly life-abundant target.", styles["ManualBodyTight"])],
            ]
        )
    )
    story.append(
        callout(
            "Core lesson",
            "One tiny pocket of life in a huge, mostly hostile cosmos does not automatically look like a universe optimized for abundant life, much less for humans. The analogy forces that distinction into the open.",
            tint=SAND,
        )
    )

    story.extend(section("6. How to read the diagnosis"))
    story.append(
        Paragraph(
            "Step 6 is where the tool becomes most useful. It turns your answers into a current read rather than a verdict.",
            styles["ManualBody"],
        )
    )
    diagnosis_rows = [
        [Paragraph("<b>Output</b>", styles["ManualBodyTight"]), Paragraph("<b>How to read it</b>", styles["ManualBodyTight"])],
        [Paragraph("Claim you asked for", styles["ManualBodyTight"]), Paragraph("The conclusion you wanted fine-tuning to carry.", styles["ManualBodyTight"])],
        [Paragraph("Highest fully earned claim", styles["ManualBodyTight"]), Paragraph("The strict ceiling. This is as far as the substantiated bridges with real notes currently take you.", styles["ManualBodyTight"])],
        [Paragraph("Highest still tentatively live", styles["ManualBodyTight"]), Paragraph("The maybe ceiling. This is how far the case could go if asserted bridges later hold up.", styles["ManualBodyTight"])],
        [Paragraph("Prior pressure", styles["ManualBodyTight"]), Paragraph("An even average of identity pull, delegated trust, reversed symmetry willingness, and reversed mind-change willingness.", styles["ManualBodyTight"])],
        [Paragraph("World-shape tension", styles["ManualBodyTight"]), Paragraph("A check on whether the actual universe matches the route-relevant expected universe on beach size and stack abundance.", styles["ManualBodyTight"])],
        [Paragraph("Human-target pressure", styles["ManualBodyTight"]), Paragraph("A check on whether the case is leaning toward humans more quickly than its own bridge support allows.", styles["ManualBodyTight"])],
        [Paragraph("Pressure list", styles["ManualBodyTight"]), Paragraph("The yellow flags appear only when the current inputs create real pressure. They can grow, shrink, or disappear as the answers change.", styles["ManualBodyTight"])],
    ]
    story.append(two_col_rows(diagnosis_rows))
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        Paragraph(
            "A good diagnosis usually ends in one cleaner sentence, not one bigger sentence. That is progress, not failure.",
            styles["ManualBody"],
        )
    )

    story.extend(section("7. What an honest result can sound like"))
    story.append(
        bullet_list(
            [
                "Fine-tuning may support a thin design hunch, but it does not yet support life-purpose.",
                "Life-purpose is still tentatively live, but the actual world-shape remains too sparse for a stronger reading.",
                "The case may still favor design over brute accident, yet the human-target step is clearly ahead of the support.",
                "The argument may remain live, but prior pressure or target ambiguity still does too much of the work.",
            ]
        )
    )
    story.append(
        callout(
            "What counts as a good result",
            "A good result is not necessarily pro-design or anti-design. A good result is a cleaner and more disciplined statement of how far the current evidence really goes.",
        )
    )

    story.extend(section("8. Common mistakes and misuses"))
    story.append(
        bullet_list(
            [
                "Treating the tool as a verdict machine instead of as a bridge audit.",
                "Borrowing human-purpose from life-purpose or borrowing Christian-purpose from generic design.",
                "Using divine economy to explain cosmic sparseness and then pretending that economy alone points to humans.",
                "Treating a striking probability judgment as if a fair measure over alternatives has already been established.",
                "Forgetting that observers can only observe observer-permitting regions and then mistaking the observation itself for the full puzzle.",
            ]
        )
    )

    story.extend(section("9. Who this tool serves best"))
    story.append(
        Paragraph(
            "This tool is most helpful for seekers who are sincere enough to let a cherished conclusion become thinner if the support is thinner. It is especially useful for people who still think design may be live but want to stop smuggling in life-purpose, human-purpose, or Christianity too early.",
            styles["ManualBody"],
        )
    )
    story.append(
        Paragraph(
            "It is also useful for teachers, discussion leaders, and debate partners because it gives a shared vocabulary: claim level, bridge, world-shape, target ambiguity, strict ceiling, and pressure list.",
            styles["ManualBody"],
        )
    )

    story.extend(section("10. What to do next"))
    story.append(
        Paragraph(
            "The Fine-Tuning Bridge Audit is upstream. Once you know the current honest ceiling, carry that result into Theism Gradient rather than allowing the fine-tuning section to dissolve into a much wider Christian conclusion.",
            styles["ManualBody"],
        )
    )
    story.append(
        bullet_list(
            [
                "If the strict ceiling stays below design, keep the fine-tuning section thin.",
                "If thin design is earned but life-purpose is not, say that plainly.",
                "If life-purpose is tentative but human-purpose is not earned, do not let later theistic claims borrow the stronger reading.",
                "Use the exported summary or AI prompt when you want another person or model to challenge the bridge work without losing the details.",
            ]
        )
    )

    story.extend(section("11. One-page quick reference", "Reference"))
    quick_rows = [
        [Paragraph("<b>When to use this tool</b>", styles["ManualBodyTight"]), Paragraph("When fine-tuning is being asked to support more than a vague design hunch.", styles["ManualBodyTight"])],
        [Paragraph("<b>Its core question</b>", styles["ManualBodyTight"]), Paragraph("What exactly has the fine-tuning argument earned, and what is it quietly borrowing?", styles["ManualBodyTight"])],
        [Paragraph("<b>Its best output</b>", styles["ManualBodyTight"]), Paragraph("One cleaner sentence about the current ceiling of the argument.", styles["ManualBodyTight"])],
        [Paragraph("<b>Its main warning</b>", styles["ManualBodyTight"]), Paragraph("Do not let a sparse life pocket be silently treated as if it already proves life-abundance, human-purpose, or Christian purpose.", styles["ManualBodyTight"])],
        [Paragraph("<b>Its next destination</b>", styles["ManualBodyTight"]), Paragraph("Theism Gradient, with the bridge pressure already named.", styles["ManualBodyTight"])],
    ]
    story.append(two_col_rows([[Paragraph("<b>Quick reference</b>", styles["ManualBodyTight"]), Paragraph("<b>Use</b>", styles["ManualBodyTight"])]] + quick_rows))
    story.append(Spacer(1, 0.1 * inch))
    story.append(
        callout(
            "Final encouragement",
            "If this tool lowers the ceiling of a claim you hoped was stronger, that is not wasted work. It means the seeker in you is becoming more careful than the advocate in you, and that is exactly the kind of honesty this manual is meant to support.",
            tint=TEAL_SOFT,
        )
    )
    return story


def main():
    doc = make_doc(OUTPUT_PDF)
    story = build_story()
    doc.build(story)
    print(OUTPUT_PDF)


if __name__ == "__main__":
    main()
