from __future__ import annotations

import json
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "deism-theism-gradient-audit-manual.pdf"
CLAIMS = ROOT / "public" / "claims.json"

OLIVE = colors.HexColor("#66752c")
DARK_OLIVE = colors.HexColor("#2f3917")
PALE_OLIVE = colors.HexColor("#eef2dc")
INK = colors.HexColor("#111111")
TEXT = colors.HexColor("#3f3f3f")
MUTED = colors.HexColor("#70756a")
LINE = colors.HexColor("#c8d0b6")
SOFT = colors.HexColor("#f7f8f1")
WHITE = colors.white


def clean(value: str) -> str:
    replacements = {
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2026": "...",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    return value


def p(text: str, style: ParagraphStyle = None) -> Paragraph:
    return Paragraph(clean(text), style or STYLES["Body"])


def bullets(items: list[str], level: int = 0) -> Table:
    style = STYLES["BulletBody"] if level == 0 else STYLES["Small"]
    table = Table(
        [[p(f"- {item}", style)] for item in items],
        colWidths=[6.35 * inch],
    )
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
            ]
        )
    )
    return table


def number_list(items: list[str]) -> ListFlowable:
    return ListFlowable(
        [ListItem(p(item, STYLES["BulletBody"]), leftIndent=0) for item in items],
        bulletType="1",
        leftIndent=20,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=8,
        bulletColor=OLIVE,
    )


def section(title: str, kicker: str | None = None) -> list:
    items = []
    if kicker:
        items.append(p(kicker.upper(), STYLES["Kicker"]))
    items.append(p(title, STYLES["H1"]))
    items.append(Spacer(1, 0.14 * inch))
    return items


def subhead(title: str) -> Paragraph:
    return p(title, STYLES["H2"])


def callout(title: str, body: str) -> Table:
    table = Table(
        [[p(title, STYLES["CalloutTitle"])], [p(body, STYLES["CalloutBody"])]],
        colWidths=[6.55 * inch],
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_OLIVE),
                ("BOX", (0, 0), (-1, -1), 1.1, OLIVE),
                ("LINEBELOW", (0, 0), (-1, 0), 0.65, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 13),
                ("RIGHTPADDING", (0, 0), (-1, -1), 13),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return table


def data_table(rows: list[list], widths: list[float], header=True) -> Table:
    table = Table(rows, colWidths=widths, repeatRows=1 if header else 0)
    style = [
        ("BOX", (0, 0), (-1, -1), 0.7, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("BACKGROUND", (0, 0), (-1, 0), DARK_OLIVE if header else WHITE),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE if header else INK),
    ]
    table.setStyle(TableStyle(style))
    return table


def card_grid(cards: list[tuple[str, str]]) -> Table:
    rows = []
    for index in range(0, len(cards), 2):
        row = []
        for title, body in cards[index : index + 2]:
            row.append([
                p(title, STYLES["CardTitle"]),
                Spacer(1, 0.04 * inch),
                p(body, STYLES["Small"]),
            ])
        if len(row) == 1:
            row.append("")
        rows.append(row)
    table = Table(rows, colWidths=[3.18 * inch, 3.18 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
                ("BACKGROUND", (0, 0), (-1, -1), SOFT),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def footer(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(0.72 * inch, 0.58 * inch, width - 0.72 * inch, 0.58 * inch)
    canvas.setFont("Helvetica-Bold", 7.4)
    canvas.setFillColor(DARK_OLIVE)
    canvas.drawString(0.72 * inch, 0.39 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 7.4)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(width / 2, 0.39 * inch, "Deism-Theism Gradient Audit Manual")
    canvas.drawRightString(width - 0.72 * inch, 0.39 * inch, str(doc.page))
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    width, height = letter
    canvas.setFillColor(SOFT)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(DARK_OLIVE)
    canvas.rect(0, height - 1.1 * inch, width, 1.1 * inch, stroke=0, fill=1)
    canvas.setFillColor(OLIVE)
    canvas.rect(0, 0, 0.45 * inch, height, stroke=0, fill=1)

    canvas.setStrokeColor(OLIVE)
    canvas.setLineWidth(1.2)
    for offset in [0, 0.28 * inch, 0.56 * inch]:
        canvas.line(width - 2.15 * inch + offset, 1.12 * inch, width - 0.55 * inch + offset, 2.65 * inch)
        canvas.line(width - 0.65 * inch - offset, 1.18 * inch, width - 2.2 * inch - offset, 2.6 * inch)

    canvas.setFillColor(INK)
    canvas.setFont("Helvetica-Bold", 61)
    canvas.drawString(0.9 * inch, 7.12 * inch, "Deism-")
    canvas.drawString(0.9 * inch, 6.37 * inch, "Theism")
    canvas.drawString(0.9 * inch, 5.62 * inch, "Gradient")
    canvas.drawString(0.9 * inch, 4.87 * inch, "Audit")

    canvas.setFillColor(DARK_OLIVE)
    canvas.setFont("Helvetica-Bold", 22)
    canvas.drawString(0.93 * inch, 4.28 * inch, "A Manual for Sincere Seekers")

    canvas.setFillColor(TEXT)
    canvas.setFont("Helvetica", 13)
    intro = [
        "A guided workbook for using the audit to clarify what you believe,",
        "why you believe it, and where confidence, evidence, experience,",
        "testimony, and bridge premises may be carrying uneven weight.",
    ]
    y = 3.8 * inch
    for line in intro:
        canvas.drawString(0.94 * inch, y, line)
        y -= 0.24 * inch

    canvas.setFillColor(WHITE)
    canvas.roundRect(0.94 * inch, 1.22 * inch, 3.4 * inch, 0.52 * inch, 8, stroke=0, fill=1)
    canvas.setFillColor(DARK_OLIVE)
    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawString(1.12 * inch, 1.39 * inch, "Crosshairs Audit Lab")
    canvas.setFont("Helvetica", 9.4)
    canvas.drawRightString(4.1 * inch, 1.39 * inch, "xhairs.com")
    canvas.restoreState()


def estimate_toc_page(story):
    story.extend(section("Contents", "Manual map"))
    toc = [
        ("1", "Why the tool exists"),
        ("2", "The core problem: confidence can outrun substantiation"),
        ("3", "The five-band gradient"),
        ("4", "Basic functions at a glance"),
        ("5", "A quick-start workflow"),
        ("6", "How to rate claims well"),
        ("7", "How to read the dashboard"),
        ("8", "Bridge premises and dependency tension"),
        ("9", "Preset lenses, reports, and the AI prompt"),
        ("10", "Common use cases"),
        ("11", "Limits, cautions, and a healthy outcome"),
        ("Appendix", "Glossary, scoring formulas, and the 50 claims"),
    ]
    rows = [[p(num, STYLES["TocNum"]), p(label, STYLES["TocText"])] for num, label in toc]
    table = Table(rows, colWidths=[0.95 * inch, 5.35 * inch])
    table.setStyle(
        TableStyle(
            [
                ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(table)
    story.append(Spacer(1, 0.18 * inch))
    story.append(
        callout(
            "How to use this manual",
            "Read chapters 1-5 before your first pass. Keep chapters 6-9 open while rating. Use the appendix when you want exact definitions, formulas, or the full claim map.",
        )
    )


def add_manual_body(story):
    story.append(PageBreak())
    story.extend(section("Why This Tool Exists", "1"))
    story.append(
        p(
            "The Deism-Theism Gradient Audit is a clarity tool for people who want their beliefs to become more honest, more proportionate, and less protected from inspection. It is especially useful for sincere Christians, seekers, doubters, pastors, teachers, and discussion groups who want to ask not only what is believed, but what role each belief plays in a larger web of convictions."
        )
    )
    story.append(
        p(
            "The tool does not try to settle whether Christianity is true. It helps users map the distance between thin claims, such as a source or creator of reality, and thicker Christian claims about prayer, healing, revelation, Jesus, the Holy Spirit, salvation, and transformation."
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        card_grid(
            [
                (
                    "For sincere seekers",
                    "It gives language for honest uncertainty without forcing a person into premature rejection or unearned certainty.",
                ),
                (
                    "For Christians",
                    "It distinguishes mature confidence from inherited confidence, borrowed authority, and claims that need more direct support.",
                ),
                (
                    "For doubters",
                    "It identifies exactly where pressure appears rather than treating all Christian claims as one undifferentiated block.",
                ),
                (
                    "For groups",
                    "It creates a structured way to discuss evidence, testimony, and experience without shaming disagreement.",
                ),
            ]
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        callout(
            "The guiding question",
            "What can my current evidence, experience, reasoning, testimony, and bridge premises responsibly support - and where am I asking a claim to carry more weight than it has earned?",
        )
    )

    story.append(PageBreak())
    story.extend(section("Confidence Can Outrun Substantiation", "2"))
    story.append(
        p(
            "The central distinction in the audit is between Confidence and Personal Substantiation. A person can sincerely believe a claim, find it emotionally meaningful, and live within a community that treats it as central, while still being unable to personally make a careful case for it."
        )
    )
    story.append(
        data_table(
            [
                [p("Term", STYLES["TableHeader"]), p("What it asks", STYLES["TableHeader"]), p("Common mistake", STYLES["TableHeader"])],
                [
                    p("Confidence", STYLES["TableCellBold"]),
                    p("How credible or likely the claim currently seems to you.", STYLES["TableCell"]),
                    p("Using it as a loyalty marker or identity signal.", STYLES["TableCell"]),
                ],
                [
                    p("Personal Substantiation", STYLES["TableCellBold"]),
                    p("How well you can personally explain, defend, qualify, and revise the claim under fair questioning.", STYLES["TableCell"]),
                    p("Borrowing a pastor's, apologist's, scholar's, or community's case as if it were your own mastery.", STYLES["TableCell"]),
                ],
                [
                    p("Gap", STYLES["TableCellBold"]),
                    p("The positive distance between Confidence and Personal Substantiation.", STYLES["TableCell"]),
                    p("Treating a large gap as proof the claim is false rather than as a prompt for repair.", STYLES["TableCell"]),
                ],
            ],
            [1.35 * inch, 2.55 * inch, 2.65 * inch],
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        p(
            "A high Confidence score with a low Personal Substantiation score is not automatically irrational. Human knowledge depends on trust, testimony, communities, experts, memory, and experience. The audit simply asks users to label that structure honestly."
        )
    )
    story.append(
        callout(
            "A useful sentence",
            "I may hold this claim by trust, hope, testimony, or tradition, but I should not pretend that I can personally carry the entire evidential burden unless I can actually do so.",
        )
    )

    story.append(PageBreak())
    story.extend(section("The Five-Band Gradient", "3"))
    story.append(
        p(
            "The audit is called a gradient because its claims become thicker as they move from broad source claims to specifically Christian divine-action claims. The movement from left to right requires bridge premises. A bridge premise is a claim that licenses movement from a thinner claim to a thicker one."
        )
    )
    gradient_rows = [
        [p("Band", STYLES["TableHeader"]), p("Focus", STYLES["TableHeader"]), p("Core question", STYLES["TableHeader"])],
        [p("1. Minimal Deism", STYLES["TableCellBold"]), p("Source, contingency, explanation", STYLES["TableCell"]), p("Is there an explanatory source beyond the physical universe?", STYLES["TableCell"])],
        [p("2. Design Deism", STYLES["TableCellBold"]), p("Order, purpose, life-permitting structure", STYLES["TableCell"]), p("Is the source plausibly purposive or design-like?", STYLES["TableCell"])],
        [p("3. Personal Theism", STYLES["TableCellBold"]), p("Mind, awareness, intention, communication", STYLES["TableCell"]), p("Can the source reasonably be treated as a personal agent?", STYLES["TableCell"])],
        [p("4. Interventionist Theism", STYLES["TableCellBold"]), p("Prayer, healing, guidance, foreknowledge, transformation", STYLES["TableCell"]), p("Does the Christian God act in human life in distinguishable ways?", STYLES["TableCell"])],
        [p("5. Specific Christian Theism", STYLES["TableCellBold"]), p("Jesus, scripture, Spirit, salvation, worship", STYLES["TableCell"]), p("Are specifically Christian claims warranted, not merely possible?", STYLES["TableCell"])],
    ]
    story.append(data_table(gradient_rows, [1.55 * inch, 2.2 * inch, 2.8 * inch]))
    story.append(Spacer(1, 0.12 * inch))
    story.append(
        p(
            "The gradient does not assume that belief must develop in this order psychologically. Some people begin with personal experience, worship, or testimony. The gradient asks about logical support: what must be true for a downstream claim to be licensed?"
        )
    )

    story.append(PageBreak())
    story.extend(section("Basic Functions at a Glance", "4"))
    story.append(
        p(
            "The app is intentionally compact, but it contains several working surfaces. Use the claim cards for rating, the dashboard for pattern recognition, and the reports for reflection or follow-up analysis."
        )
    )
    function_rows = [
        [p("Function", STYLES["TableHeader"]), p("What it does", STYLES["TableHeader"]), p("Use it when...", STYLES["TableHeader"])],
        [p("Claim cards", STYLES["TableCellBold"]), p("Present one auditable claim, two sliders, notes, diagnostics, and an annotation accordion.", STYLES["TableCell"]), p("You are doing the actual rating work.", STYLES["TableCell"])],
        [p("Confidence slider", STYLES["TableCellBold"]), p("Records how credible the claim currently seems.", STYLES["TableCell"]), p("You want to name belief-strength without pretending it is all personally defended.", STYLES["TableCell"])],
        [p("Personal Substantiation slider", STYLES["TableCellBold"]), p("Records how well you can personally explain and defend the claim.", STYLES["TableCell"]), p("You want to separate personal mastery from delegated trust.", STYLES["TableCell"])],
        [p("View, Category, Search", STYLES["TableCellBold"]), p("Restrict which of the 50 claims appear below.", STYLES["TableCell"]), p("You want only matching items, such as prayer, scripture, high-gap, or unrated claims.", STYLES["TableCell"])],
        [p("Next Unrated", STYLES["TableCellBold"]), p("Jumps to the next claim without scores.", STYLES["TableCell"]), p("You want a systematic first pass.", STYLES["TableCell"])],
        [p("Review Pressure", STYLES["TableCellBold"]), p("Jumps to the most urgent gap or dependency alert.", STYLES["TableCell"]), p("You want to repair the profile rather than keep rating new claims.", STYLES["TableCell"])],
        [p("Export / Import", STYLES["TableCellBold"]), p("Saves or restores a JSON profile with scores and notes.", STYLES["TableCell"]), p("You want backups, comparison over time, or movement between browsers.", STYLES["TableCell"])],
        [p("Reports and AI prompt", STYLES["TableCellBold"]), p("Turn the current profile into readable summaries or a rigorous follow-up prompt.", STYLES["TableCell"]), p("You want a second-stage review outside the live interface.", STYLES["TableCell"])],
    ]
    story.append(data_table(function_rows, [1.45 * inch, 2.85 * inch, 2.25 * inch]))
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        callout(
            "Important filter rule",
            "The View, Category, and Search controls do not change the 50-claim bank or erase saved ratings. They only determine which matching items are displayed in the Claim Explorer.",
        )
    )

    story.append(PageBreak())
    story.extend(section("A Quick-Start Workflow", "5"))
    story.append(number_list([
        "Open the audit and make a quick first pass through claims that feel central to your faith, doubt, or inquiry.",
        "For each claim, assign Confidence separately from Personal Substantiation.",
        "Use the note field whenever a score depends on trust, testimony, private experience, or an unresolved question.",
        "Use filters to focus on a category such as prayer, healing, scripture, Jesus, or divine guidance.",
        "Review the dashboard only after enough claims are rated for a visible pattern to emerge.",
        "Inspect Diagnostic Alerts, then decide whether to lower Confidence, raise Personal Substantiation, or revise the claim more modestly.",
        "Copy the final report or AI prompt for a second-stage Socratic review.",
    ]))
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        callout(
            "Do not polish the first pass",
            "The first pass is a snapshot, not a confession of final certainty. Honest rough numbers are more useful than inflated numbers that protect a preferred identity.",
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(subhead("A simple rhythm"))
    story.append(
        p(
            "First pass: rate quickly. Second pass: inspect gaps. Third pass: inspect dependency tension. Fourth pass: revise notes and export the report. Later: repeat the audit and compare changes."
        )
    )

    story.append(PageBreak())
    story.extend(section("How To Rate Claims Well", "6"))
    story.append(
        p(
            "The sliders use a 0-100 scale, but the numbers are not meant to look scientific beyond the user's honesty. The aim is disciplined self-rating: enough precision to reveal patterns, not false precision that pretends to settle the matter."
        )
    )
    rubric_rows = [
        [p("Range", STYLES["TableHeader"]), p("Confidence guide", STYLES["TableHeader"]), p("Personal Substantiation guide", STYLES["TableHeader"])],
        [p("0-20", STYLES["TableCellBold"]), p("Very weak, speculative, or currently implausible.", STYLES["TableCell"]), p("I cannot presently defend this claim.", STYLES["TableCell"])],
        [p("20-40", STYLES["TableCellBold"]), p("Possible but thinly supported.", STYLES["TableCell"]), p("I can name a few considerations but not a responsible case.", STYLES["TableCell"])],
        [p("40-60", STYLES["TableCellBold"]), p("Plausible or partially credible.", STYLES["TableCell"]), p("I can sketch a partial case and acknowledge live objections.", STYLES["TableCell"])],
        [p("60-80", STYLES["TableCellBold"]), p("Substantially credible.", STYLES["TableCell"]), p("I can explain the main evidence, bridge premises, and alternatives.", STYLES["TableCell"])],
        [p("80-100", STYLES["TableCellBold"]), p("Strongly credible and resilient under challenge.", STYLES["TableCell"]), p("I can defend it carefully, with caveats, defeaters, and scope limits.", STYLES["TableCell"])],
    ]
    story.append(data_table(rubric_rows, [0.9 * inch, 2.82 * inch, 2.82 * inch]))
    story.append(Spacer(1, 0.16 * inch))
    story.append(subhead("When to add a note"))
    story.append(bullets([
        "When a claim is held mainly by delegated trust.",
        "When a private experience matters deeply but is hard to evaluate publicly.",
        "When testimony is central and you need to remember its strengths or weaknesses.",
        "When a claim depends on a bridge premise you have not yet inspected.",
        "When you think the claim should be restated more modestly.",
    ]))

    story.append(PageBreak())
    story.extend(section("How To Read The Dashboard", "7"))
    story.append(
        p(
            "The dashboard is not a grade. It is a map of pressure points. Its job is to show where a profile is earning rightward movement on the gradient and where confidence may be outrunning personal support."
        )
    )
    metric_cards = [
        ("Aggregate Position", "A 1-to-5 progress estimate. It starts at 1 and adds each rightward band's average effective support divided by 100."),
        ("Theism Index", "The same position converted to a 0-to-100 progress scale."),
        ("Average Substantiation Gap", "The average positive amount by which Confidence exceeds Personal Substantiation."),
        ("Claim Scatter", "A visual field showing where rated claims sit by category lane and Confidence."),
        ("Category Profile", "Average Confidence and Personal Substantiation within each gradient band."),
        ("Diagnostic Alerts", "High-pressure claims where gaps or dependency tensions deserve review."),
    ]
    story.append(card_grid(metric_cards))
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        callout(
            "The key calculation",
            "Effective support = 100 x sqrt((Confidence / 100) x (Personal Substantiation / 100)). A claim with C 90 and P 10 does not behave like a strongly supported claim. Its effective support is about 30.",
        )
    )

    story.append(PageBreak())
    story.extend(section("Bridge Premises and Dependency Tension", "8"))
    story.append(
        p(
            "A downstream claim can be more specific than the claims that support it. Dependency tension appears when a later claim has much higher effective support than its prerequisites. This is especially important for claims about miraculous healing, answered prayer, prophecy, scripture, Jesus, and the Holy Spirit."
        )
    )
    story.append(subhead("Example"))
    story.append(
        p(
            "A high rating for 'The Christian God sometimes miraculously heals' creates pressure if the more basic claims about divine agency, answered prayer, and distinguishing divine action from coincidence are weak, unrated, or only lightly substantiated."
        )
    )
    story.append(Spacer(1, 0.12 * inch))
    story.append(bullets([
        "Ask what must be true before the downstream claim is licensed.",
        "Check whether a bridge claim is merely possible or actually supported.",
        "Avoid moving from a broad creator claim to a specific Christian action claim without an independent step.",
        "Use the Dependency Map to locate the weakest bridge rather than treating all doubts as equally important.",
    ]))
    story.append(
        callout(
            "The repair question",
            "What independently defensible premise would justify this move from a thinner claim to a thicker Christian conclusion?",
        )
    )

    story.append(PageBreak())
    story.extend(section("Preset Lenses, Reports, and the AI Prompt", "9"))
    story.append(
        p(
            "Preset lenses are comparison profiles. They are not identities to adopt or answers to submit. Apply one, inspect the pattern, then ask where your actual profile is more skeptical, more doctrinal, more experiential, or more cautious than the label you might use for yourself."
        )
    )
    story.append(
        data_table(
            [
                [p("Feature", STYLES["TableHeader"]), p("Best use", STYLES["TableHeader"])],
                [p("Preset Lenses", STYLES["TableCellBold"]), p("Compare your ratings with recognizable stance profiles.", STYLES["TableCell"])],
                [p("Brief Report", STYLES["TableCellBold"]), p("Capture a quick status summary.", STYLES["TableCell"])],
                [p("Full Report", STYLES["TableCellBold"]), p("Export the most complete map of scores, categories, gaps, tensions, and notes.", STYLES["TableCell"])],
                [p("Skeptical Audit", STYLES["TableCellBold"]), p("Pressure-test the strongest claims and largest leaps.", STYLES["TableCell"])],
                [p("Pastoral Reflection", STYLES["TableCellBold"]), p("Review the same structure in gentler language for personal or group reflection.", STYLES["TableCell"])],
                [p("AI Prompt", STYLES["TableCellBold"]), p("Carry the current profile into a Socratic assistant for deeper follow-up.", STYLES["TableCell"])],
            ],
            [1.65 * inch, 4.9 * inch],
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        p(
            "When using the AI prompt, ask the assistant to focus on one claim, one bridge premise, or one category transition at a time. The goal is not to let an AI settle your worldview. The goal is to make your next question sharper."
        )
    )

    story.append(PageBreak())
    story.extend(section("Common Use Cases", "10"))
    story.append(
        card_grid(
            [
                ("Personal audit", "A Christian wants to see which beliefs are personally anchored and which are mostly inherited."),
                ("Doubt clarification", "A doubter wants to identify the exact claim or bridge premise where confidence collapsed."),
                ("Pastoral conversation", "A leader wants to discuss evidence without treating honest uncertainty as disloyalty."),
                ("Study group", "A group compares which claims feel strongest, weakest, most testimonial, or most dependent on experience."),
                ("Seeker inquiry", "A seeker distinguishes 'Christianity might be true' from 'this specific Christian claim is warranted.'"),
                ("Apologetics repair", "An apologist rewrites an overstrong claim into a more modest conclusion the evidence can actually carry."),
            ]
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        callout(
            "A group-use norm",
            "The healthiest group use lets people say 'I hold this by trust,' 'I need to study this,' or 'this claim should be more modest' without treating that honesty as failure.",
        )
    )

    story.append(PageBreak())
    story.extend(section("Limits, Cautions, and a Healthy Outcome", "11"))
    story.append(subhead("What the tool does not do"))
    story.append(bullets([
        "It does not decide whether Christianity is true.",
        "It does not measure spiritual maturity, sincerity, or devotion.",
        "It does not prove a claim false when Personal Substantiation is low.",
        "It does not turn private experience into public evidence by itself.",
        "It cannot prevent dishonest self-rating; it can only make patterns easier to notice.",
    ]))
    story.append(Spacer(1, 0.14 * inch))
    story.append(subhead("What a good outcome looks like"))
    story.append(
        p(
            "A good outcome is not necessarily a lower or higher Theism Index. A good outcome is a clearer map: which claims are central, which are speculative, which are supported by testimony, which depend on private experience, which require bridge premises, and which should be stated more modestly."
        )
    )
    story.append(
        p(
            "Some users may end with a more carefully defended Christian profile. Others may end with a more modest Christian profile, a deistic profile, or an agnostic profile with sharper open questions. The common gain is reduced blur."
        )
    )
    story.append(Spacer(1, 0.14 * inch))
    story.append(
        callout(
            "Quality standard",
            "Use the tool well when your final profile contains clear notes, proportionate scores, named bridge premises, fair rival explanations, and at least one claim you are willing to make more modest.",
        )
    )


def add_appendix(story, claims):
    story.append(PageBreak())
    story.extend(section("Appendix A: Glossary and Formulas", "Appendix"))
    glossary_rows = [
        [p("Term", STYLES["TableHeader"]), p("Meaning in this audit", STYLES["TableHeader"])],
        [p("Confidence", STYLES["TableCellBold"]), p("How credible the claim currently seems.", STYLES["TableCell"])],
        [p("Personal Substantiation", STYLES["TableCellBold"]), p("How well you can personally defend the claim with evidence, bridge premises, rival-explanation handling, and defeater awareness.", STYLES["TableCell"])],
        [p("Effective Support", STYLES["TableCellBold"]), p("100 x sqrt((C / 100) x (P / 100)). This discounts claims when either C or P is low.", STYLES["TableCell"])],
        [p("Substantiation Gap", STYLES["TableCellBold"]), p("max(0, C - P). High P does not cancel unsupported confidence elsewhere.", STYLES["TableCell"])],
        [p("Dependency Tension", STYLES["TableCellBold"]), p("Downstream effective support minus the average effective support of prerequisite bridge claims. Unrated prerequisites count as zero current support.", STYLES["TableCell"])],
        [p("Bridge Premise", STYLES["TableCellBold"]), p("A premise that licenses movement from a thinner claim to a thicker downstream claim.", STYLES["TableCell"])],
    ]
    story.append(data_table(glossary_rows, [1.75 * inch, 4.8 * inch]))
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        callout(
            "Formula summary",
            "Effective Support is measured from 0 to 100. Aggregate Position = 1 + ((Design support + Personal support + Interventionist support + Specific Christian support) / 100). Theism Index = ((Aggregate Position - 1) / 4) x 100.",
        )
    )

    story.append(PageBreak())
    story.extend(section("Appendix B: The 50-Claim Architecture", "Appendix"))
    story.append(
        p(
            "The full claim set is grouped below so users can see the architecture before rating. The live app contains annotations, tags, dependencies, filters, and notes for each claim."
        )
    )
    grouped = {}
    for claim in claims:
        grouped.setdefault(claim["category"], []).append(claim)
    for category, category_claims in grouped.items():
        story.append(Spacer(1, 0.12 * inch))
        story.append(subhead(category))
        rows = [[p("ID", STYLES["TableHeader"]), p("Claim", STYLES["TableHeader"])]]
        for claim in category_claims:
            rows.append([p(claim["id"], STYLES["TableCellBold"]), p(claim["text"], STYLES["TableCell"])])
        story.append(data_table(rows, [0.65 * inch, 5.9 * inch]))


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    claims = json.loads(CLAIMS.read_text())

    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.72 * inch,
        leftMargin=0.72 * inch,
        topMargin=0.76 * inch,
        bottomMargin=0.74 * inch,
        title="Deism-Theism Gradient Audit Manual",
        author="Phil Stilwell",
        subject="Manual for the Deism-Theism Gradient Audit",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=frame, onPage=cover),
            PageTemplate(id="body", frames=frame, onPage=footer),
        ]
    )

    story = []
    story.append(Spacer(1, 7.75 * inch))
    story.append(NextPageTemplate("body"))
    story.append(PageBreak())
    estimate_toc_page(story)
    add_manual_body(story)
    add_appendix(story, claims)
    doc.build(story)
    print(OUTPUT)


STYLES = getSampleStyleSheet()
STYLES.add(
    ParagraphStyle(
        name="Tiny",
        parent=STYLES["BodyText"],
        fontSize=1,
        leading=1,
        textColor=colors.transparent,
    )
)
STYLES.add(
    ParagraphStyle(
        name="Kicker",
        parent=STYLES["BodyText"],
        fontName="Helvetica-Bold",
        fontSize=7.8,
        leading=9,
        textColor=OLIVE,
        spaceAfter=5,
        tracking=0.7,
    )
)
STYLES.add(
    ParagraphStyle(
        name="H1",
        parent=STYLES["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=25,
        leading=28,
        textColor=INK,
        spaceAfter=2,
    )
)
STYLES.add(
    ParagraphStyle(
        name="H2",
        parent=STYLES["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=17,
        textColor=DARK_OLIVE,
        spaceBefore=10,
        spaceAfter=7,
    )
)
STYLES.add(
    ParagraphStyle(
        name="Body",
        parent=STYLES["BodyText"],
        fontName="Helvetica",
        fontSize=10.2,
        leading=15.2,
        textColor=TEXT,
        spaceAfter=8,
    )
)
STYLES.add(
    ParagraphStyle(
        name="BulletBody",
        parent=STYLES["Body"],
        leftIndent=0,
        firstLineIndent=0,
        spaceAfter=4,
    )
)
STYLES.add(
    ParagraphStyle(
        name="Small",
        parent=STYLES["Body"],
        fontSize=8.8,
        leading=12.2,
        textColor=TEXT,
        spaceAfter=4,
    )
)
STYLES.add(
    ParagraphStyle(
        name="CardTitle",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=10.2,
        leading=12,
        textColor=DARK_OLIVE,
        spaceAfter=2,
    )
)
STYLES.add(
    ParagraphStyle(
        name="CalloutTitle",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=10.4,
        leading=12,
        textColor=DARK_OLIVE,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="CalloutBody",
        parent=STYLES["Body"],
        fontSize=9.2,
        leading=13.4,
        textColor=TEXT,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TableHeader",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=8.2,
        leading=10,
        textColor=WHITE,
        alignment=TA_LEFT,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TableCell",
        parent=STYLES["Body"],
        fontSize=8.15,
        leading=10.6,
        textColor=TEXT,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TableCellBold",
        parent=STYLES["TableCell"],
        fontName="Helvetica-Bold",
        textColor=DARK_OLIVE,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TocNum",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=OLIVE,
        alignment=TA_RIGHT,
        spaceAfter=0,
    )
)
STYLES.add(
    ParagraphStyle(
        name="TocText",
        parent=STYLES["Body"],
        fontName="Helvetica-Bold",
        fontSize=11,
        leading=14,
        textColor=INK,
        spaceAfter=0,
    )
)


if __name__ == "__main__":
    build_pdf()
