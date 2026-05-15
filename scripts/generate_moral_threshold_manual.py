from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
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
OUTPUT = ROOT / "assets" / "manuals" / "moral-system-threshold-manual.pdf"


PALETTE = {
    "ink": colors.HexColor("#231305"),
    "muted": colors.HexColor("#5d4533"),
    "line": colors.HexColor("#b89065"),
    "paper": colors.HexColor("#fff7e4"),
    "card": colors.HexColor("#fffaf0"),
    "gold": colors.HexColor("#8b610f"),
    "gold_soft": colors.HexColor("#fff1c8"),
    "red": colors.HexColor("#9b2f27"),
    "red_soft": colors.HexColor("#ffe8e3"),
    "green": colors.HexColor("#2f6b49"),
    "green_soft": colors.HexColor("#e8f6ed"),
    "blue": colors.HexColor("#2f578f"),
    "blue_soft": colors.HexColor("#e8f0ff"),
    "slate": colors.HexColor("#ece7dc"),
}


ROUTE_GROUPS = [
    (
        "Authority routes",
        "Divine command, Scripture, God's nature, Church tradition",
        "These routes must show why the authority counts as morally trustworthy rather than merely inherited, powerful, or familiar."
    ),
    (
        "Inner routes",
        "Holy Spirit, Conscience",
        "These routes must show how ordinary people can publicly access the standard and resolve disagreement."
    ),
    (
        "Practical routes",
        "Reason / natural law, Harm / flourishing",
        "These routes must show both what makes the claim true and why it binds as obligation rather than advice."
    ),
    (
        "Hybrid route",
        "Hybrid / mixed route",
        "This route must say which parts of the blend are load-bearing and how they work together without quiet contradictions."
    ),
]


COMPONENTS = [
    (
        "Moral Meaning",
        "Defines what moral words mean before using them as if they already carry objective content.",
        "What do you mean by wrong, good, duty, and obligation?",
        "Vocabulary without content",
    ),
    (
        "Truth Maker",
        "Explains whether moral claims can be true and what in reality makes them true.",
        "What makes a moral claim true beyond preference, power, or agreement?",
        "Preference or power",
    ),
    (
        "Authority Check",
        "Explains how a claimed authority is recognized as morally trustworthy without circularity.",
        "Why trust the claimed moral authority as good before simply obeying it?",
        "Obedience without moral test",
    ),
    (
        "Moral Access",
        "Gives accountable agents a usable method for knowing the standard and checking disputes.",
        "How can ordinary accountable people know the standard and resolve disagreement?",
        "Hidden standard",
    ),
    (
        "Binding Force",
        "Explains why the claim binds rather than merely advising, rewarding, or warning.",
        "Why ought anyone comply even when doing so is costly or unrewarded?",
        "Practical advice",
    ),
    (
        "Case Guidance",
        "Shows how the system decides actual cases and ranks duties when they conflict.",
        "How does the system decide hard cases before the preferred answer is known?",
        "Abstraction without decisions",
    ),
    (
        "Consistent Scope",
        "States who is bound and applies the same standard to like cases across persons and times.",
        "Who is bound, and why are like cases treated alike across people, eras, and groups?",
        "Special pleading",
    ),
    (
        "Correction Method",
        "Explains how mistaken interpretations are identified and revised without ad hoc convenience.",
        "How does the system detect and repair mistaken moral judgments?",
        "Ad hoc revision",
    ),
]


DIAGNOSIS_LADDER = [
    (
        "Threshold met -> Candidate moral system",
        "All eight components are effectively substantiated.",
    ),
    (
        "Below threshold -> Conclusions without architecture",
        "Asserted + substantiated total 3 or fewer components.",
    ),
    (
        "Below threshold -> Rule source with hidden assumptions",
        "Authority route selected, but Authority Check is not effectively substantiated.",
    ),
    (
        "Below threshold -> Intuition-led outlook",
        "Holy Spirit or Conscience route selected, but Moral Access is not effectively substantiated.",
    ),
    (
        "Below threshold -> Practical framework",
        "Reason / natural law or Harm / flourishing route selected, but Truth Maker or Binding Force is not effectively substantiated.",
    ),
    (
        "Below threshold -> Abstract value language",
        "Case Guidance is not effectively substantiated.",
    ),
    (
        "Near threshold -> Local code under revision",
        "Case Guidance is substantiated, but Consistent Scope or Correction Method is not effectively substantiated.",
    ),
    (
        "Near threshold -> Partial moral architecture",
        "The view has passed the route-specific gates above, but one or more components still remain merely asserted.",
    ),
]


class WorkflowStrip(Flowable):
    def __init__(self, width: float):
        super().__init__()
        self.width = width
        self.height = 108

    def draw(self) -> None:
        canvas = self.canv
        gap = 14
        card_width = (self.width - (2 * gap)) / 3
        entries = [
            ("1", "Threshold", "Clarify whether there is enough architecture to count as a system at all.", PALETTE["gold"], PALETTE["gold_soft"]),
            ("2", "Stress Test", "Pressure the same structure with authority, disagreement, and counterfactual strain.", PALETTE["blue"], PALETTE["blue_soft"]),
            ("3", "Particulars", "Cash the architecture out in concrete moral cases and comparisons.", PALETTE["red"], PALETTE["red_soft"]),
        ]

        for index, (step, title, copy, accent, fill) in enumerate(entries):
            x = index * (card_width + gap)
            y = 8
            canvas.setFillColor(fill)
            canvas.setStrokeColor(accent)
            canvas.setLineWidth(1.2)
            canvas.roundRect(x, y, card_width, 90, 12, stroke=1, fill=1)
            canvas.setFillColor(accent)
            canvas.circle(x + 18, y + 72, 10, stroke=0, fill=1)
            canvas.setFillColor(colors.white)
            canvas.setFont("Helvetica-Bold", 9)
            canvas.drawCentredString(x + 18, y + 68.5, step)
            canvas.setFillColor(PALETTE["ink"])
            canvas.setFont("Helvetica-Bold", 12)
            canvas.drawString(x + 34, y + 68, title)
            canvas.setFont("Helvetica", 8.7)
            text = canvas.beginText(x + 14, y + 50)
            text.setLeading(10.5)
            for line in wrap_text(copy, 28):
                text.textLine(line)
            canvas.drawText(text)
            if index < 2:
                line_y = y + 45
                start_x = x + card_width + 4
                end_x = x + card_width + gap - 4
                canvas.setStrokeColor(PALETTE["line"])
                canvas.setLineWidth(1.4)
                canvas.line(start_x, line_y, end_x, line_y)
                canvas.line(end_x - 6, line_y + 4, end_x, line_y)
                canvas.line(end_x - 6, line_y - 4, end_x, line_y)


def wrap_text(text: str, words_per_line: int) -> list[str]:
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


def styles():
    sheet = getSampleStyleSheet()
    body = ParagraphStyle(
        "Body",
        parent=sheet["BodyText"],
        fontName="Helvetica",
        fontSize=10.4,
        leading=15.2,
        textColor=PALETTE["muted"],
        spaceAfter=0,
    )
    return {
        "kicker": ParagraphStyle(
            "Kicker",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=PALETTE["gold"],
            alignment=TA_LEFT,
            spaceAfter=4,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=32,
            textColor=PALETTE["ink"],
            spaceAfter=10,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=13.4,
            leading=18,
            textColor=PALETTE["gold"],
            spaceAfter=10,
        ),
        "lead": ParagraphStyle(
            "Lead",
            parent=body,
            fontName="Helvetica",
            fontSize=12.4,
            leading=18,
            textColor=PALETTE["muted"],
            spaceAfter=0,
        ),
        "section_title": ParagraphStyle(
            "SectionTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=23,
            textColor=PALETTE["ink"],
            spaceAfter=6,
        ),
        "body": body,
        "body_strong": ParagraphStyle(
            "BodyStrong",
            parent=body,
            fontName="Helvetica-Bold",
            textColor=PALETTE["ink"],
        ),
        "small": ParagraphStyle(
            "Small",
            parent=body,
            fontSize=9.2,
            leading=12.8,
        ),
        "card_title": ParagraphStyle(
            "CardTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=11.8,
            leading=14,
            textColor=PALETTE["ink"],
            spaceAfter=3,
        ),
        "card_copy": ParagraphStyle(
            "CardCopy",
            parent=body,
            fontSize=9.1,
            leading=12.2,
            textColor=PALETTE["muted"],
        ),
        "tight_list": ParagraphStyle(
            "TightList",
            parent=body,
            leftIndent=0,
            bulletIndent=0,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "quote": ParagraphStyle(
            "Quote",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=12,
            leading=17,
            textColor=PALETTE["ink"],
            alignment=TA_CENTER,
        ),
        "table_head": ParagraphStyle(
            "TableHead",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=9.4,
            leading=12,
            textColor=PALETTE["ink"],
        ),
        "table_cell": ParagraphStyle(
            "TableCell",
            parent=body,
            fontSize=8.9,
            leading=12.2,
            textColor=PALETTE["muted"],
        ),
        "center_small": ParagraphStyle(
            "CenterSmall",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=9,
            leading=11,
            textColor=PALETTE["ink"],
            alignment=TA_CENTER,
        ),
    }


def page_background(canvas, doc) -> None:
    width, height = letter
    canvas.saveState()
    if doc.page == 1:
        canvas.setFillColor(PALETTE["paper"])
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#fff0c9"))
        canvas.rect(0, height - 2.2 * inch, width, 2.2 * inch, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#f5dd9f"))
        canvas.circle(width - 0.95 * inch, height - 0.78 * inch, 64, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#eed39a"))
        canvas.circle(width - 1.15 * inch, height - 0.96 * inch, 38, stroke=0, fill=1)
    else:
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setStrokeColor(colors.HexColor("#efd9a7"))
        canvas.setLineWidth(2)
        canvas.line(0.75 * inch, height - 0.74 * inch, width - 0.75 * inch, height - 0.74 * inch)
        canvas.setStrokeColor(colors.HexColor("#efe6d4"))
        canvas.setLineWidth(1)
        canvas.line(0.75 * inch, 0.58 * inch, width - 0.75 * inch, 0.58 * inch)
        canvas.setFillColor(PALETTE["gold"])
        canvas.setFont("Helvetica-Bold", 8.2)
        canvas.drawString(0.78 * inch, height - 0.62 * inch, "MORAL SYSTEM THRESHOLD MANUAL")
        canvas.setFillColor(PALETTE["muted"])
        canvas.setFont("Helvetica", 8.2)
        canvas.drawRightString(width - 0.78 * inch, 0.38 * inch, f"Page {doc.page}")
    canvas.restoreState()


def section_heading(style_map, kicker: str, title: str, lede: str | None = None):
    parts = [
        Paragraph(kicker.upper(), style_map["kicker"]),
        Paragraph(title, style_map["section_title"]),
    ]
    if lede:
        parts.append(Paragraph(lede, style_map["body"]))
    return parts


def info_card(style_map, title: str, body: str, accent: colors.Color, fill: colors.Color, width: float):
    inner = [
        Paragraph(title, style_map["card_title"]),
        Spacer(1, 4),
        Paragraph(body, style_map["card_copy"]),
    ]
    table = Table([[inner]], colWidths=[width])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 1, accent),
                ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def chip_row(style_map, chips: list[tuple[str, colors.Color, colors.Color]], total_width: float):
    col_width = (total_width - 16) / len(chips)
    row = []
    for label, border, fill in chips:
        cell = Table(
            [[Paragraph(label, style_map["center_small"])]],
            colWidths=[col_width],
        )
        cell.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), fill),
                    ("BOX", (0, 0), (-1, -1), 1, border),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            )
        )
        row.append(cell)
    table = Table([row], colWidths=[col_width] * len(chips))
    table.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    return table


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


def two_column_cards(cards: list[Table], doc_width: float):
    rows = []
    for index in range(0, len(cards), 2):
        row = cards[index:index + 2]
        if len(row) < 2:
            row.append(Spacer(1, 1))
        rows.append(row)
    table = Table(rows, colWidths=[doc_width / 2 - 8, doc_width / 2 - 8], hAlign="LEFT")
    table.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 12)]))
    return table


def component_card(style_map, component: tuple[str, str, str, str], width: float):
    title, description, question, collapse = component
    flow = [
        Paragraph(title, style_map["card_title"]),
        Spacer(1, 3),
        Paragraph(description, style_map["card_copy"]),
        Spacer(1, 5),
        Paragraph(f"<b>Question:</b> {question}", style_map["small"]),
        Spacer(1, 4),
        Paragraph(f"<b>If weak or absent:</b> {collapse}", style_map["small"]),
    ]
    card = Table([[flow]], colWidths=[width])
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["card"]),
                ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#dfc7a6")),
                ("LINEABOVE", (0, 0), (-1, 0), 4, PALETTE["gold"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return card


def route_group_table(style_map, width: float):
    rows = [
        [
            Paragraph("<b>Route family</b>", style_map["table_head"]),
            Paragraph("<b>What it includes</b>", style_map["table_head"]),
            Paragraph("<b>What the tool especially checks</b>", style_map["table_head"]),
        ]
    ]
    for title, includes, focus in ROUTE_GROUPS:
        rows.append(
            [
                Paragraph(title, style_map["table_cell"]),
                Paragraph(includes, style_map["table_cell"]),
                Paragraph(focus, style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width * 0.18, width * 0.25, width * 0.57])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["gold_soft"]),
                ("TEXTCOLOR", (0, 0), (-1, 0), PALETTE["ink"]),
                ("GRID", (0, 0), (-1, -1), 0.9, colors.HexColor("#d6c09a")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def diagnosis_table(style_map, width: float):
    rows = [
        [
            Paragraph("<b>Effective outcome</b>", style_map["table_head"]),
            Paragraph("<b>Exact condition</b>", style_map["table_head"]),
        ]
    ]
    for outcome, condition in DIAGNOSIS_LADDER:
        rows.append(
            [
                Paragraph(outcome, style_map["table_cell"]),
                Paragraph(condition, style_map["table_cell"]),
            ]
        )
    table = Table(rows, colWidths=[width * 0.36, width * 0.64])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["gold_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.9, colors.HexColor("#d6c09a")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def build_story(doc_width: float):
    s = styles()
    story = []

    story.extend(section_heading(s, "Manual", "Moral System Threshold", "A concise field manual for sincere seekers who want to know whether an alleged Christian moral system is already a coherent system, or whether it is still relying on a source, reaction, or conclusion that has not yet supplied enough architecture."))
    story.append(Paragraph("Use this tool before making the larger case. It slows the conversation down at exactly the point where hidden assumptions usually do the most work.", s["cover_subtitle"]))
    story.append(Spacer(1, 8))
    story.append(
        chip_row(
            s,
            [
                ("Clarify before debating", PALETTE["gold"], PALETTE["gold_soft"]),
                ("Separate source from system", PALETTE["blue"], PALETTE["blue_soft"]),
                ("Carry the setup into the next audit", PALETTE["green"], PALETTE["green_soft"]),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 14))
    story.append(
        info_card(
            s,
            "The key value",
            "Many people can name scripture, conscience, God's nature, or flourishing before they can explain how moral meaning, truth, authority, access, obligation, scope, and correction actually work. This manual treats that gap as clarifying, not embarrassing.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(Spacer(1, 14))

    cover_cards = Table(
        [[
            info_card(
                s,
                "Best used by",
                "Sincere seekers, careful Christian apologists, discussion partners, teachers, and anyone who wants a cleaner first-pass before a more adversarial debate begins.",
                PALETTE["blue"],
                PALETTE["blue_soft"],
                doc_width / 2 - 8,
            ),
            info_card(
                s,
                "What it does not claim",
                "The page does not prove a worldview false, replace moral reasoning, or settle Christianity by itself. It only asks whether the claimed moral view has enough visible structure to count as a system at all.",
                PALETTE["red"],
                PALETTE["red_soft"],
                doc_width / 2 - 8,
            ),
        ]],
        colWidths=[doc_width / 2 - 8, doc_width / 2 - 8],
    )
    cover_cards.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    story.append(cover_cards)
    story.append(Spacer(1, 16))
    story.extend(section_heading(s, "Sequence", "How it fits the morality pipeline"))
    story.append(Paragraph("The threshold page is intentionally preliminary. It should make the later tools sharper by making the hidden assumptions visible first.", s["body"]))
    story.append(Spacer(1, 10))
    story.append(WorkflowStrip(doc_width))
    story.append(PageBreak())

    story.extend(section_heading(s, "Why it matters", "Why sincere seekers benefit from this tool", "The most common moral mistake in apologetics is to move too quickly from a favored conclusion to the language of moral certainty without first showing the structure that would make that certainty intelligible."))
    story.append(
        bullet_list(
            s,
            [
                "It helps a person distinguish between a moral source and a moral system.",
                "It surfaces exactly which missing component is doing too much hidden work.",
                "It turns vague disagreement into a concrete architectural question.",
                "It lowers the heat of a discussion by replacing personality friction with structured clarification.",
            ],
        )
    )
    story.append(Spacer(1, 14))
    story.append(
        info_card(
            s,
            "The distinction to keep in view",
            "A rule source is not yet a full moral system. A sincere seeker may have real convictions, a trusted text, and a strong moral sensibility while still lacking a public account of truth, access, obligation, case guidance, scope, or correction.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(Spacer(1, 14))
    story.extend(section_heading(s, "Routes", "What the route selector is really doing"))
    story.append(Paragraph("The route selector is not a verdict. It tells the tool which kind of pathway is supposed to be carrying the claim, so the tool can test the most relevant structural weakness first.", s["body"]))
    story.append(Spacer(1, 8))
    story.append(route_group_table(s, doc_width))
    story.append(Spacer(1, 14))
    story.extend(section_heading(s, "Posture", "How to use it charitably"))
    story.append(
        bullet_list(
            s,
            [
                "Ask, \"What is doing the work here?\" more often than, \"How can I defeat this view?\"",
                "Treat missing structure as an invitation to clarify, not as an automatic confession of bad faith.",
                "Use one component at a time. The tool is strongest when it narrows the question instead of widening the conflict.",
            ],
        )
    )

    story.extend(section_heading(s, "Basic functions", "How to move through the page", "The tool works best as a four-pass intake screen. Each pass is short, but together they expose whether the architecture is actually present."))
    workflow_cards = [
        info_card(s, "1. Choose the grounding route", "Select the route that is supposed to carry the moral claim: divine command, scripture, God's nature, Holy Spirit, conscience, church tradition, reason / natural law, harm / flourishing, or a hybrid blend.", PALETTE["gold"], PALETTE["gold_soft"], doc_width / 2 - 8),
        info_card(s, "2. State the claim in plain language", "Write the moral claim as the user would actually say it. This keeps the page tied to the live position rather than to a perfected reconstruction.", PALETTE["blue"], PALETTE["blue_soft"], doc_width / 2 - 8),
        info_card(s, "3. Mark the eight components", "For each threshold component, choose Missing, Asserted, or Substantiated and then name what support is actually doing the work there.", PALETTE["green"], PALETTE["green_soft"], doc_width / 2 - 8),
        info_card(s, "4. Read the diagnosis and handoff", "The diagnosis tells you what kind of structure is really present. The handoff carries the same setup into the Moral System Stress Test.", PALETTE["red"], PALETTE["red_soft"], doc_width / 2 - 8),
    ]
    story.append(two_column_cards(workflow_cards, doc_width))
    story.append(Spacer(1, 8))
    story.extend(section_heading(s, "Ratings", "How the three ratings should be read"))
    story.append(
        chip_row(
            s,
            [
                ("Missing: the component is not really present yet", PALETTE["red"], PALETTE["red_soft"]),
                ("Asserted: named or implied, but still thin, circular, vague, or borrowed", PALETTE["gold"], PALETTE["gold_soft"]),
                ("Substantiated: explained with enough support to do real work in the system", PALETTE["green"], PALETTE["green_soft"]),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 12))
    story.append(
        info_card(
            s,
            "Important numerical rule",
            "A selected Substantiated rating only counts numerically as substantiated when the grounding note is present. If the support box is empty, the tool treats that component as Asserted for the counts, diagnosis, readiness label, summary, AI prompt, readiness map, and stress-test handoff.",
            PALETTE["red"],
            PALETTE["red_soft"],
            doc_width,
        )
    )
    story.append(Spacer(1, 12))
    story.extend(section_heading(s, "Readiness map", "What the compact graph is for"))
    story.append(Paragraph("The readiness map is intentionally lightweight. It is not a prestige chart. It gives a quick visual of which of the eight components are still missing, merely asserted, or actually substantiated so the user can spot the bottleneck at a glance.", s["body"]))
    story.append(PageBreak())

    story.extend(section_heading(s, "Eight components", "The eight threshold components at a glance", "Each component answers a necessary question. If the component is weak, the tool names what the view currently collapses into."))
    component_cards_a = [component_card(s, component, doc_width / 2 - 8) for component in COMPONENTS[:4]]
    story.append(two_column_cards(component_cards_a, doc_width))
    story.append(PageBreak())

    story.extend(section_heading(s, "Eight components", "The second half of the threshold architecture", "These later components matter because a moral system has to guide cases, define scope, and repair mistakes rather than merely declare ideals."))
    component_cards_b = [component_card(s, component, doc_width / 2 - 8) for component in COMPONENTS[4:]]
    story.append(two_column_cards(component_cards_b, doc_width))

    story.extend(section_heading(s, "Diagnosis logic", "How the page classifies the current result", "The tool uses the effective component statuses and route family to determine the diagnosis. The ladder below states the logic as directly as possible."))
    story.append(diagnosis_table(s, doc_width))
    story.append(Spacer(1, 14))
    story.extend(section_heading(s, "Readiness", "What the readiness states mean"))
    story.append(
        chip_row(
            s,
            [
                ("Not yet: below threshold", PALETTE["red"], PALETTE["red_soft"]),
                ("Almost: near threshold", PALETTE["gold"], PALETTE["gold_soft"]),
                ("Yes: threshold met", PALETTE["green"], PALETTE["green_soft"]),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 12))
    story.extend(section_heading(s, "Handoff", "Exactly what carries into the Stress Test"))
    handoff_table = Table(
        [
            [
                Paragraph("<b>Threshold state</b>", s["table_head"]),
                Paragraph("<b>Stress Test preload</b>", s["table_head"]),
            ],
            [Paragraph("Missing", s["table_cell"]), Paragraph("Not preloaded", s["table_cell"])],
            [Paragraph("Asserted", s["table_cell"]), Paragraph("Strength 1", s["table_cell"])],
            [Paragraph("Substantiated", s["table_cell"]), Paragraph("Strength 3", s["table_cell"])],
            [Paragraph("Grounding note", s["table_cell"]), Paragraph("Optional note carried forward", s["table_cell"])],
            [Paragraph("Claim and route", s["table_cell"]), Paragraph("Passed forward so the user does not rebuild the setup", s["table_cell"])],
        ],
        colWidths=[doc_width * 0.34, doc_width * 0.66],
    )
    handoff_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["gold_soft"]),
                ("GRID", (0, 0), (-1, -1), 0.9, colors.HexColor("#d6c09a")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
            ]
        )
    )
    story.append(handoff_table)
    story.append(Spacer(1, 14))
    story.append(
        info_card(
            s,
            "A good closing question for sincere seekers",
            "If this page exposes a gap, the most constructive next move is not, \"So your view is false.\" It is, \"What would have to be added here for the claim to count as a stable moral system rather than a trusted source with hidden assumptions?\"",
            PALETTE["blue"],
            PALETTE["blue_soft"],
            doc_width,
        )
    )
    return story


def build_pdf(output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    margin = 0.78 * inch
    frame = Frame(margin, 0.78 * inch, letter[0] - (margin * 2), letter[1] - (1.24 * inch + 0.78 * inch), id="body")
    doc = BaseDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=1.24 * inch,
        bottomMargin=0.78 * inch,
        title="Moral System Threshold Manual",
        author="Phil Stilwell",
        subject="Manual for the Moral System Threshold tool",
    )
    doc.addPageTemplates([PageTemplate(id="manual", frames=[frame], onPage=page_background)])
    story = build_story(frame._width)
    doc.build(story)


if __name__ == "__main__":
    build_pdf(OUTPUT)
