from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
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
from reportlab.platypus.flowables import Flowable


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "moral-system-stress-test-manual.pdf"


PALETTE = {
    "ink": colors.HexColor("#241406"),
    "muted": colors.HexColor("#604735"),
    "paper": colors.HexColor("#fff6df"),
    "card": colors.HexColor("#fffaf0"),
    "cream": colors.HexColor("#fff2cc"),
    "line": colors.HexColor("#bc9364"),
    "gold": colors.HexColor("#965112"),
    "gold_soft": colors.HexColor("#fff0bf"),
    "red": colors.HexColor("#a6372f"),
    "red_soft": colors.HexColor("#ffe6e0"),
    "blue": colors.HexColor("#345a99"),
    "blue_soft": colors.HexColor("#e8f0ff"),
    "green": colors.HexColor("#2f6f4f"),
    "green_soft": colors.HexColor("#e6f5ec"),
    "slate": colors.HexColor("#ede7db"),
    "white": colors.white,
}


COMPONENTS = [
    (
        "Moral Meaning",
        "Defines good, wrong, duty, evil, and obligation before using those words as if they already carry objective content.",
        "Without stable meaning, moral language can collapse into approval, disgust, usefulness, or authority words.",
        "What do the key moral words mean in this account?",
    ),
    (
        "Truth Maker",
        "Explains whether moral claims can be true and what in reality makes them true.",
        "Without a truth maker, moral claims may function as attitudes, commands, or social signals rather than objective facts.",
        "What makes the claim true beyond preference, power, or agreement?",
    ),
    (
        "Authority Check",
        "Explains how moral authority is recognized as good without assuming the authority is already moral.",
        "Without this check, the system can become obedience to a source already presumed to be right.",
        "How could an immoral authority claim be detected and rejected?",
    ),
    (
        "Moral Access",
        "Gives accountable agents a usable way to know the standard and compare disputed claims.",
        "If people are bound, the account must explain how they can discover what binds them.",
        "How can sincere users know the standard and resolve disagreement?",
    ),
    (
        "Binding Force",
        "Explains why morality obligates rather than merely advises, rewards, threatens, or recommends.",
        "Useful advice is not yet moral duty. A system needs an account of obligation itself.",
        "Why ought someone comply even when it is costly or unrewarded?",
    ),
    (
        "Case Guidance",
        "Applies the standard to real cases and ranks duties when they conflict.",
        "A moral system must guide actual decisions, not only produce slogans or broad aspirations.",
        "How does the account decide hard cases before the desired answer is chosen?",
    ),
    (
        "Consistent Scope",
        "States who is bound and treats like cases alike across persons, eras, groups, and authorities.",
        "Without scope, the system can protect favored people or outcomes by special pleading.",
        "Who is bound, and why are like cases treated alike?",
    ),
    (
        "Correction Method",
        "Explains how mistaken moral interpretations are identified and revised without ad hoc convenience.",
        "A system needs a principled way to learn from error without calling every change a new moral fact.",
        "How does the system detect and repair mistaken moral judgments?",
    ),
]


SOURCE_LANES = [
    "God's nature",
    "Divine command",
    "Scripture",
    "Holy Spirit guidance",
    "Church tradition",
    "Conscience or moral intuition",
    "Reason or natural law",
    "Human flourishing",
    "Hybrid Christian account",
]


COMMON_STARTS = [
    "Divine command",
    "God's nature",
    "Scripture authority",
    "Scripture and Spirit",
    "Natural law",
    "God-given conscience",
    "Church tradition",
    "Love commandments",
    "Christlike virtue",
    "Kingdom ethic",
    "Flourishing in God",
    "Moral lawgiver",
]


BOUNDARIES = [
    (
        "Emotion Boundary",
        "Tests whether the claim is more than personal feeling, conscience, empathy, disgust, preference, or cultural approval.",
        "Most pressured by conscience, intuition, and flourishing routes when Moral Meaning or Truth Maker is incomplete.",
    ),
    (
        "Obedience Boundary",
        "Tests whether the claim is more than submission to an authority already assumed to be moral.",
        "Most pressured by divine command, scripture, God's nature, church tradition, and Holy Spirit routes when Authority Check or Moral Access is incomplete.",
    ),
    (
        "Practical Boundary",
        "Tests whether the claim is more than useful advice, social benefit, cooperation, or a flourishing strategy.",
        "Most pressured by reason, natural law, human flourishing, and hybrid routes when Binding Force is incomplete.",
    ),
    (
        "Guidance Boundary",
        "Tests whether the proposed system can actually decide hard cases and rank competing duties.",
        "Always relevant, because every attempted moral system needs Case Guidance no matter which route carries it.",
    ),
]


class SourceMapSketch(Flowable):
    def __init__(self, width: float):
        super().__init__()
        self.width = width
        self.height = 142

    def draw(self) -> None:
        canvas = self.canv
        left = 36
        bottom = 30
        plot_width = self.width - 52
        plot_height = 86
        lane_width = plot_width / len(SOURCE_LANES)

        canvas.setFillColor(colors.white)
        canvas.setStrokeColor(PALETTE["line"])
        canvas.setLineWidth(1)
        canvas.rect(left, bottom, plot_width, plot_height, stroke=1, fill=1)

        for index in range(len(SOURCE_LANES)):
            x = left + index * lane_width
            if index % 2:
                canvas.setFillColor(colors.HexColor("#fbf7ea"))
                canvas.rect(x, bottom, lane_width, plot_height, stroke=0, fill=1)
            canvas.setStrokeColor(colors.HexColor("#e6d7bd"))
            canvas.line(x, bottom, x, bottom + plot_height)
            canvas.setFillColor(PALETTE["ink"])
            canvas.setFont("Helvetica-Bold", 7.6)
            canvas.drawCentredString(x + lane_width / 2, bottom - 14, str(index + 1))

        for value in range(5):
            y = bottom + (plot_height * value / 4)
            canvas.setStrokeColor(colors.HexColor("#eadfce"))
            canvas.line(left, y, left + plot_width, y)
            canvas.setFillColor(PALETTE["muted"])
            canvas.setFont("Helvetica-Bold", 7)
            canvas.drawRightString(left - 8, y - 2.5, str(value))

        canvas.setFillColor(PALETTE["blue"])
        canvas.setStrokeColor(PALETTE["blue"])
        canvas.setLineWidth(7)
        canvas.setLineCap(1)
        samples = [(1, 3.0, 0.75), (2, 3.4, 1.0), (6, 2.2, 0.5), (8, 3.7, 0.95)]
        for lane, support, opacity in samples:
            x1 = left + lane * lane_width + lane_width * 0.18
            x2 = left + lane * lane_width + lane_width * 0.82
            y = bottom + plot_height * support / 4
            canvas.setFillAlpha(opacity)
            canvas.setStrokeAlpha(opacity)
            canvas.line(x1, y, x2, y)
        canvas.setFillAlpha(1)
        canvas.setStrokeAlpha(1)

        canvas.setFillColor(PALETTE["muted"])
        canvas.setFont("Helvetica-Bold", 8)
        canvas.saveState()
        canvas.translate(12, bottom + plot_height / 2)
        canvas.rotate(90)
        canvas.drawCentredString(0, 0, "Support strength")
        canvas.restoreState()
        canvas.drawCentredString(left + plot_width / 2, 4, "Source lanes")


class PipelineStrip(Flowable):
    def __init__(self, width: float):
        super().__init__()
        self.width = width
        self.height = 96

    def draw(self) -> None:
        canvas = self.canv
        gap = 14
        card_width = (self.width - 2 * gap) / 3
        entries = [
            ("1", "Threshold", "Preliminary tool: checks whether enough structure exists.", PALETTE["gold"], PALETTE["gold_soft"]),
            ("2", "Stress Test", "Current tool: tests components, boundaries, routes, and hard questions.", PALETTE["blue"], PALETTE["blue_soft"]),
            ("3", "Particulars", "Advanced tool: applies the setup to concrete moral cases.", PALETTE["red"], PALETTE["red_soft"]),
        ]
        for index, (number, title, body, accent, fill) in enumerate(entries):
            x = index * (card_width + gap)
            canvas.setFillColor(fill)
            canvas.setStrokeColor(accent)
            canvas.roundRect(x, 6, card_width, 78, 9, stroke=1, fill=1)
            canvas.setFillColor(PALETTE["ink"])
            canvas.setFont("Helvetica-Bold", 11)
            canvas.drawString(x + 38, 66, title)
            canvas.setFillColor(accent)
            canvas.circle(x + 21, 69, 11, stroke=0, fill=1)
            canvas.setFillColor(colors.white)
            canvas.setFont("Helvetica-Bold", 9)
            canvas.drawCentredString(x + 21, 65.5, number)
            canvas.setFillColor(PALETTE["muted"])
            canvas.setFont("Helvetica", 8)
            text = canvas.beginText(x + 13, 50)
            text.setLeading(10)
            for line in wrap_to_width(body, "Helvetica", 8, card_width - 26):
                text.textLine(line)
            canvas.drawText(text)


def wrap_words(text: str, words_per_line: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current: list[str] = []
    for word in words:
        current.append(word)
        if len(current) >= words_per_line:
            lines.append(" ".join(current))
            current = []
    if current:
        lines.append(" ".join(current))
    return lines


def wrap_to_width(text: str, font_name: str, font_size: float, max_width: float) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        trial = f"{current} {word}".strip()
        if current and pdfmetrics.stringWidth(trial, font_name, font_size) > max_width:
            lines.append(current)
            current = word
        else:
            current = trial
    if current:
        lines.append(current)
    return lines


def styles():
    sheet = getSampleStyleSheet()
    body = ParagraphStyle(
        "ManualBody",
        parent=sheet["BodyText"],
        fontName="Helvetica",
        fontSize=9.8,
        leading=14.2,
        textColor=PALETTE["muted"],
        spaceAfter=0,
    )
    return {
        "kicker": ParagraphStyle(
            "Kicker",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=8.4,
            leading=10.2,
            textColor=PALETTE["gold"],
            alignment=TA_LEFT,
            spaceAfter=4,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=31,
            leading=34,
            textColor=PALETTE["ink"],
            spaceAfter=8,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=13.2,
            leading=18,
            textColor=PALETTE["gold"],
            spaceAfter=8,
        ),
        "lead": ParagraphStyle(
            "Lead",
            parent=body,
            fontName="Helvetica",
            fontSize=12.2,
            leading=17,
            textColor=PALETTE["muted"],
        ),
        "section_title": ParagraphStyle(
            "SectionTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=19,
            leading=22.5,
            textColor=PALETTE["ink"],
            spaceAfter=6,
        ),
        "subhead": ParagraphStyle(
            "Subhead",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=12.2,
            leading=15,
            textColor=PALETTE["ink"],
            spaceAfter=3,
        ),
        "body": body,
        "small": ParagraphStyle(
            "Small",
            parent=body,
            fontSize=8.45,
            leading=11.4,
            textColor=PALETTE["muted"],
        ),
        "card_title": ParagraphStyle(
            "CardTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=10.6,
            leading=13,
            textColor=PALETTE["ink"],
        ),
        "card_copy": ParagraphStyle(
            "CardCopy",
            parent=body,
            fontSize=8.35,
            leading=11.3,
            textColor=PALETTE["muted"],
        ),
        "table_head": ParagraphStyle(
            "TableHead",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=8.35,
            leading=10.8,
            textColor=PALETTE["ink"],
        ),
        "table_cell": ParagraphStyle(
            "TableCell",
            parent=body,
            fontSize=7.95,
            leading=10.8,
            textColor=PALETTE["muted"],
        ),
        "center_small": ParagraphStyle(
            "CenterSmall",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=10.2,
            alignment=TA_CENTER,
            textColor=PALETTE["ink"],
        ),
    }


def page_background(canvas, doc) -> None:
    width, height = letter
    canvas.saveState()
    if doc.page == 1:
        canvas.setFillColor(PALETTE["paper"])
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#fff0c2"))
        canvas.rect(0, height - 2.15 * inch, width, 2.15 * inch, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#f2daa0"))
        canvas.circle(width - 0.92 * inch, height - 0.7 * inch, 58, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#e6c06f"))
        canvas.circle(width - 1.12 * inch, height - 0.92 * inch, 30, stroke=0, fill=1)
        canvas.setFillColor(PALETTE["ink"])
        canvas.setFont("Helvetica-Bold", 46)
        canvas.drawCentredString(width - 0.95 * inch, height - 0.93 * inch, "X")
    else:
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setStrokeColor(colors.HexColor("#edd4a5"))
        canvas.setLineWidth(1.6)
        canvas.line(0.7 * inch, height - 0.7 * inch, width - 0.7 * inch, height - 0.7 * inch)
        canvas.setStrokeColor(colors.HexColor("#efe6d7"))
        canvas.setLineWidth(1)
        canvas.line(0.7 * inch, 0.58 * inch, width - 0.7 * inch, 0.58 * inch)
        canvas.setFillColor(PALETTE["gold"])
        canvas.setFont("Helvetica-Bold", 7.8)
        canvas.drawString(0.72 * inch, height - 0.58 * inch, "MORAL SYSTEM STRESS TEST MANUAL")
        canvas.setFillColor(PALETTE["ink"])
        canvas.setFont("Helvetica-Bold", 18)
        canvas.drawRightString(width - 0.72 * inch, height - 0.59 * inch, "X")
        canvas.setFillColor(PALETTE["muted"])
        canvas.setFont("Helvetica", 8)
        canvas.drawRightString(width - 0.72 * inch, 0.38 * inch, f"Page {doc.page}")
    canvas.restoreState()


def section(style_map, kicker: str, title: str, lede: str | None = None):
    flowables = [
        Paragraph(kicker.upper(), style_map["kicker"]),
        Paragraph(title, style_map["section_title"]),
    ]
    if lede:
        flowables.append(Paragraph(lede, style_map["body"]))
    return flowables


def bullet_list(style_map, entries: list[str]):
    return ListFlowable(
        [ListItem(Paragraph(entry, style_map["body"]), leftIndent=12) for entry in entries],
        bulletType="bullet",
        bulletFontName="Helvetica-Bold",
        bulletColor=PALETTE["gold"],
        leftIndent=6,
        spaceBefore=0,
        spaceAfter=0,
    )


def card(style_map, title: str, body: str, accent: colors.Color, fill: colors.Color, width: float):
    inner = [Paragraph(title, style_map["card_title"]), Spacer(1, 4), Paragraph(body, style_map["card_copy"])]
    table = Table([[inner]], colWidths=[width], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.9, accent),
                ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def two_column_cards(cards: list[Table], doc_width: float):
    rows = []
    for index in range(0, len(cards), 2):
        row = cards[index:index + 2]
        if len(row) < 2:
            row.append(Spacer(1, 1))
        rows.append(row)
    table = Table(rows, colWidths=[doc_width / 2 - 8, doc_width / 2 - 8], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    return table


def chip_row(style_map, chips: list[tuple[str, colors.Color, colors.Color]], total_width: float):
    col_width = total_width / len(chips)
    row = []
    for label, border, fill in chips:
        cell = Table([[Paragraph(label, style_map["center_small"])]], colWidths=[col_width - 8])
        cell.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), fill),
                    ("BOX", (0, 0), (-1, -1), 0.8, border),
                    ("LEFTPADDING", (0, 0), (-1, -1), 7),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                    ("TOPPADDING", (0, 0), (-1, -1), 6),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            )
        )
        row.append(cell)
    table = Table([row], colWidths=[col_width] * len(chips), hAlign="LEFT")
    table.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    return table


def component_table(style_map, items: list[tuple[str, str, str, str]], width: float):
    rows = [
        [
            Paragraph("<b>Component</b>", style_map["table_head"]),
            Paragraph("<b>What it supplies</b>", style_map["table_head"]),
            Paragraph("<b>Why necessary</b>", style_map["table_head"]),
            Paragraph("<b>Test question</b>", style_map["table_head"]),
        ]
    ]
    for title, supplies, necessary, question in items:
        rows.append(
            [
                Paragraph(f"<b>{title}</b>", style_map["table_cell"]),
                Paragraph(supplies, style_map["table_cell"]),
                Paragraph(necessary, style_map["table_cell"]),
                Paragraph(question, style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width * 0.18, width * 0.29, width * 0.33, width * 0.20], repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["gold_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.75, colors.HexColor("#dcc39e")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def rows_table(style_map, rows: list[list[str]], widths: list[float], header: bool = True):
    built = []
    for row_index, row in enumerate(rows):
        style = style_map["table_head"] if header and row_index == 0 else style_map["table_cell"]
        built.append([Paragraph(cell, style) for cell in row])
    table = Table(built, colWidths=widths, repeatRows=1 if header else 0)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["gold_soft"] if header else colors.white),
                ("GRID", (0, 0), (-1, -1), 0.75, colors.HexColor("#dcc39e")),
                ("BACKGROUND", (0, 1 if header else 0), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def lane_legend(style_map, width: float):
    rows = []
    for index in range(0, len(SOURCE_LANES), 3):
        cells = []
        for lane_index, label in enumerate(SOURCE_LANES[index:index + 3], start=index + 1):
            cells.append(Paragraph(f"<b>{lane_index}</b>  {label}", style_map["table_cell"]))
        while len(cells) < 3:
            cells.append(Paragraph("", style_map["table_cell"]))
        rows.append(cells)
    table = Table(rows, colWidths=[width / 3] * 3)
    table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.65, colors.HexColor("#dcc39e")),
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def build_story(doc_width: float):
    s = styles()
    story = []

    story.extend(
        section(
            s,
            "Seeker manual",
            "Moral System Stress Test",
            "A practical guide for sincere seekers who want to ask whether a Christian moral claim supplies the required structure of a coherent objective moral system.",
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        card(
            s,
            "The central question",
            "When someone says Christianity provides an objective moral system, has the claim supplied meaning, truth, authority, access, obligation, guidance, scope, and correction - or has it only named a source, feeling, command, or practical recommendation?",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(Spacer(1, 12))
    story.append(
        chip_row(
            s,
            [
                ("Not a verdict machine", PALETTE["red"], PALETTE["red_soft"]),
                ("A map of missing structure", PALETTE["blue"], PALETTE["blue_soft"]),
                ("A prompt for stronger answers", PALETTE["green"], PALETTE["green_soft"]),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 14))
    story.append(
        two_column_cards(
            [
                card(
                    s,
                    "Use this to",
                    "Clarify a moral claim, identify which required parts are doing work, and ask more precise follow-up questions without pretending that a score proves truth or falsity.",
                    PALETTE["blue"],
                    PALETTE["blue_soft"],
                    doc_width / 2 - 8,
                ),
                card(
                    s,
                    "Avoid using it to",
                    "Score people, spring a trap, replace philosophical argument, or treat hesitation as defeat. The best outcome is clarity: a stronger claim or a clearer reason for doubt.",
                    PALETTE["red"],
                    PALETTE["red_soft"],
                    doc_width / 2 - 8,
                ),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 4))
    story.append(Paragraph("Crosshairs Audit Lab", s["cover_subtitle"]))
    story.append(Spacer(1, 14))
    story.append(Paragraph("INSIDE THIS MANUAL", s["kicker"]))
    story.append(
        rows_table(
            s,
            [
                ["1. Required components", "2. Workflow", "3. Calculations"],
                ["4. Source map", "5. Boundary tests", "6. Conversation use"],
            ],
            [doc_width / 3] * 3,
            header=False,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Purpose",
            "Why this tool matters",
            "Many moral debates stall because the claim stays blurry. One person says Christianity gives objective morality. Another hears command, character, scripture, conscience, usefulness, or intuition. The tool slows the exchange down and asks what must be supplied for the claim to work as a moral system.",
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        bullet_list(
            s,
            [
                "For a Christian user, it shows where a view needs stronger grounding, clearer access, better guidance, or a less circular account of authority.",
                "For a skeptical user, it replaces vague dismissal with specific questions about missing components.",
                "For a questioning user, it separates inherited confidence from what has actually been substantiated.",
                "For discussion partners, it turns a heated debate into a shared map of claims, supports, and open questions.",
            ],
        )
    )
    story.append(Spacer(1, 14))
    story.append(
        card(
            s,
            "The standard",
            "A list of moral claims is not yet a moral system. A source of rules is not yet a moral system. A coherent objective moral system must explain what moral language means, what makes moral claims true, how authority is checked, how agents can know the standard, why the standard binds, how it guides hard cases, who falls under it, and how mistakes are corrected.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(Spacer(1, 14))
    story.extend(section(s, "Starts", "The twelve common starting positions"))
    starts_rows = []
    for index in range(0, len(COMMON_STARTS), 3):
        starts_rows.append([f"{index + col + 1}. {label}" for col, label in enumerate(COMMON_STARTS[index:index + 3])])
    story.append(rows_table(s, starts_rows, [doc_width / 3] * 3, header=False))
    story.append(Spacer(1, 12))
    story.append(
        Paragraph(
            "The starting position only preloads a claim and a likely route. It does not complete the substantiation checks. The user still has to decide which supports are actually warranted.",
            s["body"],
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Required architecture",
            "The eight components",
            "The tool treats the following eight parts as mandatory. Different traditions can use different language, but a coherent objective moral system has to do the work each label names.",
        )
    )
    story.append(Spacer(1, 8))
    story.append(component_table(s, COMPONENTS[:4], doc_width))
    story.append(Spacer(1, 14))
    story.append(component_table(s, COMPONENTS[4:], doc_width))
    story.append(Spacer(1, 12))
    story.append(
        card(
            s,
            "What counts as substantiation",
            "The user does not have to write an essay. For each component, the tool asks for a primary route, a support strength, and three checkbox tests. A component is ready only when the route is chosen, the strength reaches Supported or Strong, and all three checks are completed.",
            PALETTE["green"],
            PALETTE["green_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Workflow",
            "How to move through the page",
            "The page is designed to reduce prose burden. Most of the work is done with radio buttons, route menus, sliders, and checkboxes. The optional note fields are for clarification, not for long argument.",
        )
    )
    workflow_rows = [
        ["Step", "User action", "Why it matters"],
        ["1. State the claim", "Choose a common start or write the claim narrowly.", "Prevents testing a slogan that can shift during the conversation."],
        ["2. Choose routes", "For every required component, choose the primary source route doing the work.", "Separates a claimed source from the component it is supposed to substantiate."],
        ["3. Set support", "Use the 0-4 strength control: None, Asserted, Thin, Supported, Strong.", "Makes the difference between naming a support and actually carrying a component visible."],
        ["4. Mark checks", "Complete only the checkbox tests the current answer really satisfies.", "Forces the user to think through meaning, truth, access, force, guidance, scope, and correction."],
        ["5. Read the status", "Review the coherence ledger, source map, missing core, boundaries, and top pressure.", "Shows the current structure without declaring the worldview true or false."],
        ["6. Continue", "Export the report or carry the setup to Threshold or Particulars.", "Keeps the morality tools connected without rebuilding the claim from scratch."],
    ]
    story.append(rows_table(s, workflow_rows, [doc_width * 0.18, doc_width * 0.39, doc_width * 0.43]))
    story.append(Spacer(1, 14))
    story.extend(section(s, "Sequence", "How this tool relates to the others"))
    story.append(PipelineStrip(doc_width))
    story.append(Spacer(1, 10))
    story.append(
        card(
            s,
            "A useful posture",
            "The strongest use of the tool is cooperative: 'Which part of the system is this answer meant to supply?' That question is clearer and fairer than accusing the other person of incoherence before the structure has been mapped.",
            PALETTE["blue"],
            PALETTE["blue_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Numbers",
            "How to read the calculations",
            "The numbers are structured prompts for attention. They are not probabilities, truth scores, or verdicts about the user. They summarize how much of the required architecture has been supplied inside the tool.",
        )
    )
    calc_rows = [
        ["Number", "Exact calculation", "How to read it"],
        ["Component score", "Average of three parts: route chosen (0 or 1), support completion (strength / 3, capped at 1), and check completion (checked boxes / 3).", "A component can score high before it is fully ready, but readiness still requires route, support at 3 or 4, and all checks."],
        ["Completeness", "Rounded average of the eight component scores, shown as a percentage.", "A high score means more architecture has been entered; it does not mean the moral claim is true."],
        ["Ready components", "Count of required components that have a route, Supported or Strong strength, and all checks complete.", "This is the strict checklist count. The ledger shows which components are missing, thin, or ready."],
        ["Boundary risk", "Sum across four boundary tests: pass = 0, warning = 1, failure = 2.", "Higher risk means the current construction may collapse into emotion, obedience, practical advice, or vague guidance."],
        ["Route count", "Count of distinct non-empty source routes currently assigned to required components.", "This shows dependency concentration. It is not a quality score."],
        ["Top pressure", "Challenges are sorted by match score, pressure rank, and title. Match score combines incomplete relevant components, active route overlap, and any generic sufficiency gap.", "The first items are the most relevant stress questions for the current setup."],
    ]
    story.append(rows_table(s, calc_rows, [doc_width * 0.18, doc_width * 0.42, doc_width * 0.40]))
    story.append(Spacer(1, 12))
    story.append(
        card(
            s,
            "Example",
            "If Moral Access has a route, support strength 2, and two of three checks complete, its component score is average(1, 2/3, 2/3), or about 78%. It is still not ready, because support has not reached 3 and one check remains incomplete.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Source map",
            "Visualizing the claimed sources of moral truth",
            "The source map shows where the user says moral truth is coming from. It plots source lanes, not proof of divine reality or philosophical truth.",
        )
    )
    story.append(SourceMapSketch(doc_width))
    story.append(Spacer(1, 8))
    story.append(lane_legend(s, doc_width))
    story.append(Spacer(1, 12))
    source_rows = [
        ["Visual feature", "Meaning"],
        ["Lane number", "One of the nine possible source routes."],
        ["Horizontal line", "The average support strength of all components assigned to that route."],
        ["Line thickness and darkness", "How many substantiation checks are complete on average for that route."],
        ["Legend count", "How many required components currently rely on that source route."],
        ["Component list", "Which required components are assigned to the route."],
    ]
    story.append(rows_table(s, source_rows, [doc_width * 0.30, doc_width * 0.70]))
    story.append(Spacer(1, 10))
    story.append(
        card(
            s,
            "What to look for",
            "A single lane carrying most components may reveal dependency on one source. Many lanes with low support may reveal a patchwork that has breadth but little substantiation. A strong line is a prompt to inspect the actual answers, not a final endorsement.",
            PALETTE["blue"],
            PALETTE["blue_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Boundary tests",
            "What the collapse checks are asking",
            "Boundary tests ask whether the attempted moral system remains distinct from nearby non-moral substitutes. They are especially useful when a claim sounds moral but is actually carried by feeling, obedience, usefulness, or vague aspiration.",
        )
    )
    boundary_rows = [["Boundary", "Plain question", "What usually contributes pressure"]]
    for title, question, pressure in BOUNDARIES:
        boundary_rows.append([title, question, pressure])
    story.append(rows_table(s, boundary_rows, [doc_width * 0.22, doc_width * 0.39, doc_width * 0.39]))
    story.append(Spacer(1, 14))
    story.extend(section(s, "Challenges", "How to use the pressure questions"))
    story.append(
        two_column_cards(
            [
                card(
                    s,
                    "Good use",
                    "Ask one pressure question at a time. Let the other person identify the route they actually rely on. Treat a weak answer as a repair opportunity.",
                    PALETTE["green"],
                    PALETTE["green_soft"],
                    doc_width / 2 - 8,
                ),
                card(
                    s,
                    "Poor use",
                    "Dump every challenge at once, demand instant answers, or treat any hesitation as defeat. That turns a diagnostic tool into theater.",
                    PALETTE["red"],
                    PALETTE["red_soft"],
                    doc_width / 2 - 8,
                ),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 8))
    challenge_rows = [
        ["Pressure type", "Typical question"],
        ["Circular authority", "What test identifies the authority as morally trustworthy without already assuming it?"],
        ["Access and disagreement", "How do sincere, informed people resolve incompatible moral answers?"],
        ["Historical change", "Did the moral fact change, did interpretation improve, or was the earlier command not moral?"],
        ["Guidance failure", "Can the account decide the case before the preferred conclusion is known?"],
    ]
    story.append(rows_table(s, challenge_rows, [doc_width * 0.28, doc_width * 0.72]))
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Conversation",
            "How sincere seekers can use the output",
            "The tool is most valuable when it makes the next question smaller, cleaner, and fairer. It should help both sides see the same pressure point.",
        )
    )
    phrase_rows = [
        ["Instead of saying", "Try saying"],
        ["Your view is incoherent.", "Which required component is doing the work here?"],
        ["That is just obedience.", "How does the account test whether this authority is morally trustworthy?"],
        ["That is just your feeling.", "What makes this claim true even when people feel differently?"],
        ["That does not answer anything.", "Does this answer give case guidance, binding force, or only a general aspiration?"],
        ["You moved the goalposts.", "Which correction method explains the change without special pleading?"],
    ]
    story.append(rows_table(s, phrase_rows, [doc_width * 0.36, doc_width * 0.64]))
    story.append(Spacer(1, 14))
    story.extend(section(s, "Completeness", "What a high-quality result should include"))
    story.append(
        bullet_list(
            s,
            [
                "A narrow moral claim that cannot quietly shift when pressure appears.",
                "All eight required components assigned to source routes that actually fit the answer.",
                "Support strengths marked honestly, with Thin and Asserted left visible where the case is still weak.",
                "Checkboxes completed only when the account really satisfies that specific test.",
                "Boundary and top-pressure questions answered directly rather than avoided by changing the claim.",
                "A clear export or handoff so later conversation can continue from the same setup.",
            ],
        )
    )
    story.append(Spacer(1, 14))
    story.append(
        card(
            s,
            "The best outcome",
            "The point is not embarrassment. The point is a stronger claim, a repaired argument, a humbler confidence level, or a more precise reason for doubt. That is real progress for sincere seekers.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(section(s, "Quick reference", "One-page field guide"))
    quick_rows = [
        ["Use this section", "When you need to know"],
        ["State the claim", "What exact moral-system claim is being tested."],
        ["Required components", "Whether meaning, truth, authority, access, force, guidance, scope, and correction have been supplied."],
        ["Substantiation checks", "Whether the chosen route really supports the component rather than merely naming it."],
        ["Coherence ledger", "Which components are ready, thin, missing, or route-only."],
        ["Source map", "Which moral truth sources the current account relies on, and how strongly."],
        ["Missing core", "Which mandatory components still block a coherent system claim."],
        ["Boundary tests", "Whether the system collapses into emotion, obedience, practical advice, or vague guidance."],
        ["Top pressure", "Which challenge questions most directly fit the current answers."],
        ["Question and answer", "How to interpret the tool charitably and answer common misunderstandings."],
        ["Export and handoff", "How to continue in the preliminary Threshold tool or the advanced Particulars tool."],
    ]
    story.append(rows_table(s, quick_rows, [doc_width * 0.30, doc_width * 0.70]))
    story.append(Spacer(1, 14))
    story.append(PipelineStrip(doc_width))
    story.append(Spacer(1, 14))
    story.append(
        card(
            s,
            "Closing note",
            "A coherent objective moral system may be possible, but it should not be assumed merely because a tradition names a source of moral authority. The tool asks the user to show the structure, component by component, and then test whether that structure holds under pressure.",
            PALETTE["blue"],
            PALETTE["blue_soft"],
            doc_width,
        )
    )
    return story


def build_pdf(output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    margin = 0.72 * inch
    frame = Frame(
        margin,
        0.76 * inch,
        letter[0] - 2 * margin,
        letter[1] - 1.62 * inch,
        id="body",
    )
    doc = BaseDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=0.86 * inch,
        bottomMargin=0.76 * inch,
        title="Moral System Stress Test Manual",
        author="Phil Stilwell",
        subject="Manual for the Moral System Stress Test tool",
    )
    doc.addPageTemplates([PageTemplate(id="manual", frames=[frame], onPage=page_background)])
    doc.build(build_story(frame._width))


if __name__ == "__main__":
    build_pdf(OUTPUT)
