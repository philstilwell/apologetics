from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets" / "manuals" / "moral-particulars-audit-manual-v2.pdf"

PAGE_W, PAGE_H = letter

ACCENT = colors.HexColor("#b24c4a")
ACCENT_DARK = colors.HexColor("#7f302f")
INK = colors.HexColor("#2b1514")
MUTED = colors.HexColor("#6f4746")
SOFT = colors.HexColor("#fff4f4")
SOFTER = colors.HexColor("#fffafa")
LINE = colors.HexColor("#dfaaa8")
GOLD = colors.HexColor("#9a6b18")
GOLD_SOFT = colors.HexColor("#fff1c8")
BLUE = colors.HexColor("#365f91")
BLUE_SOFT = colors.HexColor("#eef4ff")
GREEN = colors.HexColor("#3d7254")
GREEN_SOFT = colors.HexColor("#edf7f0")
GRAY = colors.HexColor("#f4f4f3")
WHITE = colors.white


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="CoverKicker",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=ACCENT_DARK,
            alignment=TA_CENTER,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverTitle",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=36,
            leading=39,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CoverSub",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=13,
            leading=19,
            textColor=MUTED,
            alignment=TA_CENTER,
            spaceAfter=16,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H1x",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=20,
            leading=24,
            textColor=INK,
            spaceBefore=4,
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2x",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13.2,
            leading=16,
            textColor=ACCENT_DARK,
            spaceBefore=9,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H3x",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=13,
            textColor=INK,
            spaceBefore=6,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyX",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=12.8,
            textColor=INK,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodySmall",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.8,
            leading=10.4,
            textColor=INK,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Muted",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=8.6,
            leading=11.8,
            textColor=MUTED,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Tiny",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=6.8,
            leading=8.4,
            textColor=MUTED,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CalloutTitle",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.6,
            leading=12,
            textColor=INK,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            parent=styles["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=7.6,
            leading=9.4,
            textColor=WHITE,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=7.25,
            leading=9.4,
            textColor=INK,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableBodyTight",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=6.9,
            leading=8.7,
            textColor=INK,
        )
    )
    return styles


STYLES = build_styles()


def p(text: str, style: str = "BodyX") -> Paragraph:
    return Paragraph(text, STYLES[style])


class AccentRule(Flowable):
    def __init__(self, color=ACCENT):
        super().__init__()
        self.color = color
        self.width = 0

    def wrap(self, avail_width, avail_height):
        self.width = avail_width
        return avail_width, 5

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.roundRect(0, 1, self.width, 3, 1.5, fill=1, stroke=0)


class PillRow(Flowable):
    def __init__(self, items, fill=WHITE, stroke=LINE, text=ACCENT_DARK):
        super().__init__()
        self.items = items
        self.fill = fill
        self.stroke = stroke
        self.text = text
        self.width = 0

    def wrap(self, avail_width, avail_height):
        self.width = avail_width
        return avail_width, 22

    def draw(self):
        c = self.canv
        c.setFont("Helvetica-Bold", 6.8)
        x = 0
        for item in self.items:
            label = item.upper()
            width = stringWidth(label, "Helvetica-Bold", 6.8) + 15
            if x + width > self.width:
                break
            c.setFillColor(self.fill)
            c.setStrokeColor(self.stroke)
            c.roundRect(x, 4, width, 15, 7, fill=1, stroke=1)
            c.setFillColor(self.text)
            c.drawCentredString(x + width / 2, 8.5, label)
            x += width + 6


def bullet_list(items, style="BodySmall"):
    return ListFlowable(
        [ListItem(p(item, style), leftIndent=10) for item in items],
        bulletType="bullet",
        leftIndent=14,
        bulletFontName="Helvetica",
        bulletFontSize=6,
        bulletOffsetY=1,
        spaceBefore=1,
        spaceAfter=4,
    )


def callout(title, body, color=ACCENT, fill=SOFT):
    table = Table([[p(title, "CalloutTitle")], [p(body, "BodySmall")]], colWidths=[None])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.7, color),
                ("LINEBEFORE", (0, 0), (0, -1), 4, color),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return table


def card(title, body, color=ACCENT, fill=SOFT, width=3.03 * inch):
    inner = Table([[p(title, "CalloutTitle")], [p(body, "BodySmall")]], colWidths=[width])
    inner.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.65, color),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return inner


def two_col(cards):
    rows = []
    for index in range(0, len(cards), 2):
        row = cards[index : index + 2]
        while len(row) < 2:
            row.append(Spacer(1, 1))
        rows.append(row)
    table = Table(rows, colWidths=[3.12 * inch, 3.12 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 3),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def data_table(data, widths, body_style="TableBody", header=True):
    rows = []
    for row_index, row in enumerate(data):
        style = "TableHead" if header and row_index == 0 else body_style
        rows.append([p(str(cell), style) for cell in row])
    table = Table(rows, colWidths=widths, repeatRows=1 if header else 0)
    commands = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.3, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
    ]
    if header:
        commands.append(("BACKGROUND", (0, 0), (-1, 0), ACCENT_DARK))
    for row_index in range(1 if header else 0, len(data)):
        if row_index % 2 == 0:
            commands.append(("BACKGROUND", (0, row_index), (-1, row_index), SOFTER))
    table.setStyle(TableStyle(commands))
    return table


def section(story, title, intro=None):
    story.append(p(title, "H1x"))
    story.append(AccentRule())
    story.append(Spacer(1, 5))
    if intro:
        story.append(p(intro, "Muted"))


def keep(items):
    return KeepTogether(items)


def on_page(canvas, doc):
    if doc.page == 1:
        return
    canvas.saveState()
    canvas.setFillColor(SOFT)
    canvas.rect(0, PAGE_H - 0.44 * inch, PAGE_W, 0.44 * inch, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_H - 0.44 * inch, PAGE_W, 0.035 * inch, fill=1, stroke=0)
    canvas.setFont("Helvetica-Bold", 7.8)
    canvas.setFillColor(ACCENT_DARK)
    canvas.drawString(doc.leftMargin, PAGE_H - 0.285 * inch, "Moral Particulars Audit Manual - Revised Edition")
    canvas.setFont("Helvetica", 7.8)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - doc.rightMargin, PAGE_H - 0.285 * inch, "Crosshairs Audit Lab")
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.45)
    canvas.line(doc.leftMargin, 0.52 * inch, PAGE_W - doc.rightMargin, 0.52 * inch)
    canvas.setFont("Helvetica", 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawString(
        doc.leftMargin,
        0.34 * inch,
        "Diagnostic use only - not a permission slip, verdict machine, or substitute for moral responsibility.",
    )
    canvas.drawRightString(PAGE_W - doc.rightMargin, 0.34 * inch, f"Page {doc.page}")
    canvas.restoreState()


def cover(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#fff6f6"))
    canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, PAGE_H - 1.15 * inch, PAGE_W, 0.12 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#f7dddd"))
    canvas.circle(PAGE_W - 1.15 * inch, PAGE_H - 1.22 * inch, 0.56 * inch, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.circle(PAGE_W - 1.15 * inch, PAGE_H - 1.22 * inch, 0.40 * inch, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor("#ffe37a"))
    canvas.setFont("Helvetica-Bold", 25)
    canvas.drawCentredString(PAGE_W - 1.15 * inch, PAGE_H - 1.32 * inch, "X")
    canvas.setFillColor(ACCENT_DARK)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawCentredString(PAGE_W / 2, 1.22 * inch, "CROSSHAIRS AUDIT LAB")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawCentredString(PAGE_W / 2, 0.96 * inch, "A field manual for reflective Christian moral reasoning")
    canvas.restoreState()


def build_story():
    story = []
    story.append(Spacer(1, 1.62 * inch))
    story.append(p("MORAL PARTICULARS AUDIT", "CoverKicker"))
    story.append(p("Manual for Sincere Seekers", "CoverTitle"))
    story.append(
        p(
            "A practical guide to the tool's value, workflow, sliders, pattern checks, and responsible use.",
            "CoverSub",
        )
    )
    story.append(PillRow(["revised edition", "case-level ethics", "grounders", "disagreement", "patterns"]))
    story.append(Spacer(1, 0.44 * inch))
    story.append(
        callout(
            "The value in one sentence",
            "The tool does not tell you what to believe; it helps you see what is doing the work when you already believe, doubt, support, oppose, or hesitate.",
            ACCENT,
            SOFT,
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(
        callout(
            "Best posture",
            "Use this manual and the tool as a mirror, not a weapon. The aim is principled clarity, intellectual charity, and stronger self-knowledge under pressure.",
            BLUE,
            BLUE_SOFT,
        )
    )
    story.append(Spacer(1, 0.16 * inch))
    story.append(p("Public tool: https://xhairs.com/apps/moral-particulars-audit/", "Muted"))
    story.append(PageBreak())

    section(
        story,
        "How to Use This Manual",
        "Read Sections 1-3 if you only need the value and basic workflow. Use Sections 4-10 while operating the tool. Use the appendices when you need exact definitions.",
    )
    story.append(
        data_table(
            [
                ["Part", "Purpose"],
                ["1-2", "Explain why concrete moral particulars matter and what the tool is not."],
                ["3-5", "Walk through the case workflow, stance choices, and qualifiers."],
                ["6-8", "Define grounders, disagreement diagnoses, dashboard states, and mapped cases."],
                ["9-10", "Explain the concentration map and pattern checks."],
                ["11-14", "Give worked examples, export guidance, responsible use, and quick reference."],
                ["Appendices", "List all grounders, all disagreement sources, and the numerical rules."],
            ],
            [1.0 * inch, 5.2 * inch],
        )
    )
    story.append(
        two_col(
            [
                card(
                    "For sincere seekers",
                    "The tool lets you ask whether Christian moral claims remain principled when they leave abstraction and enter concrete cases.",
                    GREEN,
                    GREEN_SOFT,
                ),
                card(
                    "For Christians",
                    "The tool can reveal where your answer is carried by Scripture, conscience, social formation, authority, love, or harm.",
                    ACCENT,
                    SOFT,
                ),
                card(
                    "For skeptics",
                    "The tool gives a structured way to inspect whether hard cases are handled by stable rules or by protective exceptions.",
                    BLUE,
                    BLUE_SOFT,
                ),
                card(
                    "For teachers",
                    "The tool turns moral controversy into a disciplined exercise in naming grounders, exceptions, and limiting principles.",
                    GOLD,
                    GOLD_SOFT,
                ),
            ]
        )
    )
    story.append(
        callout(
            "Quality standard",
            "A good use of the audit produces a map that is explicit, revisable, charitable toward sincere disagreement, and careful about cases involving harm or coercion.",
            ACCENT,
            SOFT,
        )
    )
    story.append(PageBreak())

    section(
        story,
        "1. Why Moral Particulars Matter",
        "Abstract moral claims can feel stable until they meet concrete cases. The audit moves from general claims about Christian morality into cases where Scripture, conscience, command, tradition, reason, social formation, harm, love, and consequences may pull with different force.",
    )
    story.append(
        bullet_list(
            [
                "Sincere seekers often want to know whether Christian moral judgment is principled or improvised.",
                "Christians often want to know whether their answers are genuinely grounded or merely inherited.",
                "Doubters often want to see whether difficult cases are handled consistently across adjacent questions.",
                "Apologists often need to test moral claims before presenting them as settled conclusions.",
            ]
        )
    )
    story.append(
        p(
            "The tool is most useful when users are willing to map their actual judgment, not the judgment they wish they had or the judgment that sounds best in public.",
            "BodyX",
        )
    )
    story.append(Spacer(1, 4))
    section(story, "2. What This Tool Does Not Do")
    story.append(
        callout(
            "Diagnostic use only",
            "The audit is not a permission slip, legal guide, pastoral ruling, or instruction to act. This is especially important for cases involving killing, state punishment, coercion, or bodily harm.",
            ACCENT,
            SOFT,
        )
    )
    story.append(
        bullet_list(
            [
                "It does not decide the moral answer for the user.",
                "It does not prove that a high-weight grounder is objectively correct.",
                "It does not prove that a disagreement diagnosis is true of another person.",
                "It does not authorize violence, coercion, exclusion, or contempt.",
                "It does not replace careful exegesis, pastoral care, legal responsibility, or personal repentance.",
            ]
        )
    )
    story.append(
        p(
            "Its narrower purpose is to make the structure of a moral map visible. Once visible, that map can be tested, revised, defended, or abandoned more honestly.",
            "BodyX",
        )
    )
    story.append(PageBreak())

    section(
        story,
        "3. Basic Workflow",
        "The entire tool can be understood as a seven-step loop. Repeat the loop for several different cases before trusting cross-case patterns.",
    )
    story.append(
        data_table(
            [
                ["Step", "Action", "Why it matters"],
                ["1", "Choose a moral particular.", "All input applies to the selected case until another case is chosen."],
                ["2", "Select your stance on the statement as written.", "This prevents hidden exceptions from being smuggled into the first answer."],
                ["3", "Weight the grounders.", "The sliders show which sources are carrying your judgment."],
                ["4", "Diagnose disagreement.", "The audit asks how you explain people who disagree with your stance."],
                ["5", "Add qualifiers.", "Use notes for exceptions, distinctions, authority limits, and uncertainty."],
                ["6", "Review patterns.", "Pattern checks reveal repeated dependencies, thin samples, and possible drift."],
                ["7", "Export the report or prompt.", "The full ledger can be reviewed, shared, or stress-tested by another reader or AI."],
            ],
            [0.42 * inch, 2.0 * inch, 3.88 * inch],
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        callout(
            "Mapped case rule",
            "A case counts as mapped only after it has a valid stance, at least one known grounder weight above zero, and at least one known disagreement-diagnosis weight above zero.",
            BLUE,
            BLUE_SOFT,
        )
    )
    story.append(
        p(
            "This rule matters because a stance alone is not yet a moral map. The tool needs both the support structure and the explanation of disagreement before the case can contribute to cross-case checks.",
            "BodyX",
        )
    )
    story.append(PageBreak())

    section(
        story,
        "4. The Case Set",
        "The list is intentionally uneven. It includes ordinary, severe, private, public, sexual, civic, doctrinal, violent, and generosity cases so the same moral method has to travel across different terrain.",
    )
    issues = [
        ["1a", "It would be immoral not to kill abortion doctors if it protected the unborn."],
        ["1b", "It would be morally permissible to kill abortion doctors if it protected the unborn."],
        ["2", "It is immoral for divorced individuals to remarry."],
        ["3", "It is immoral to have meals with apostates from Christianity."],
        ["4", "It is immoral to knowingly exceed speed limits."],
        ["5", "It is immoral for married couples to engage in oral or anal sex."],
        ["6", "It is immoral to practice circumcision or clitoridectomies."],
        ["7", "It would be moral for a government to kill homosexuals for being homosexual."],
        ["8", "It is immoral to intentionally make someone believe you feel the opposite of what you actually feel about something."],
        [
            "9",
            "It is immoral to spend this earthly life enjoying earthly pleasures when unGospelled unbelievers face eternity in Hell, when you will have eternity in Heaven to relax.",
        ],
        ["10", "It is immoral to fight for a country in a war merely for more territory."],
        ["11", "It is immoral to divorce over a spouse merely romantically kissing another individual."],
        ["12", "It is immoral not to send money to help someone you know who is starving to death."],
    ]
    story.append(data_table([["Case", "Statement"]] + issues, [0.52 * inch, 5.88 * inch], "TableBodyTight"))
    story.append(Spacer(1, 6))
    story.append(
        callout(
            "Reflection prompts",
            "Which cases feel obvious because your church, family, politics, or era trained the answer? Which cases involve coercion or killing and therefore require explicit authority and evidence limits? Which nearby cases need the same rule, and which need a morally relevant distinction?",
            BLUE,
            BLUE_SOFT,
        )
    )
    story.append(PageBreak())

    section(story, "5. Stance, As Written")
    story.append(
        p(
            "The stance panel asks for your position on the statement as written. If the statement is too broad, answer the broad sentence first, then use qualifiers to narrow it.",
            "BodyX",
        )
    )
    story.append(
        two_col(
            [
                card("Support", "You affirm the moral statement, either strongly or moderately, as it stands.", GREEN, GREEN_SOFT),
                card("Oppose", "You deny the moral statement, either strongly or moderately, as it stands.", ACCENT, SOFT),
                card("Unsure", "You do not yet know whether the statement should be affirmed or denied.", BLUE, BLUE_SOFT),
                card("Qualifiers", "Use notes for exceptions, factual assumptions, scope limits, authority conditions, or pastoral distinctions.", GOLD, GOLD_SOFT),
            ]
        )
    )
    story.append(
        callout(
            "Example",
            "A user may oppose 'It is immoral for divorced individuals to remarry' as written, but add that some remarriages may be immoral under specified covenant or betrayal conditions. The stance answers the sentence; the qualifier explains the narrowing rule.",
            ACCENT,
            SOFT,
        )
    )
    section(story, "6. Grounder Sliders")
    story.append(
        p(
            "A grounder slider is not a vote total and not a proof that the grounder is objectively decisive. It is a self-report: how much this source is carrying your current judgment on this case.",
            "BodyX",
        )
    )
    story.append(
        data_table(
            [
                ["Slider value", "Meaning"],
                ["0", "Not doing visible work for this judgment."],
                ["1-3", "Light support: present, but easy to remove without changing the judgment."],
                ["4-6", "Moderate support: visibly part of the route to the judgment."],
                ["7-8", "Strong support: removing it would put real pressure on the judgment."],
                ["9-10", "Decisive or near-decisive support as reported by the user."],
            ],
            [1.05 * inch, 5.35 * inch],
        )
    )
    story.append(PageBreak())

    section(story, "7. Grounder Definitions")
    grounders = [
        ["Scripture", "Direct texts, canonical patterns, covenant distinctions, and interpretive rules."],
        ["God's nature", "Claims about God's character as the standard for goodness."],
        ["Divine command", "A command or prohibition treated as binding because God has issued it."],
        ["Holy Spirit", "Prayerful discernment, conviction, guidance, or perceived spiritual prompting."],
        ["Conscience", "Inner moral awareness, intuition, guilt, or felt recognition of right and wrong."],
        ["Church tradition", "Historic teaching, denominational authority, creeds, catechisms, or inherited practice."],
        ["Pastoral authority", "Trusted teachers, elders, pastors, apologists, or ministry communities."],
        ["Reason / natural law", "Moral reasoning about purposes, nature, consistency, rights, or duty."],
        ["Love of neighbor", "The great commandments, mercy, charity, care, and neighbor-protecting duties."],
        ["Harm / flourishing", "Likely effects on bodies, relationships, communities, dignity, and wellbeing."],
        ["Social norms", "What family, church, politics, culture, or era treats as obvious."],
        ["Consequences", "Expected outcomes, deterrence, slippery slopes, incentives, or social stability."],
    ]
    story.append(data_table([["Grounder", "What it marks"]] + grounders, [1.45 * inch, 4.95 * inch]))
    story.append(Spacer(1, 6))
    story.append(
        callout(
            "Interpretation guardrail",
            "A high Social norms score does not mean the judgment is false. It means the social route is doing visible work and should be tested by a norm-reversal question.",
            GOLD,
            GOLD_SOFT,
        )
    )
    story.append(PageBreak())

    section(
        story,
        "8. Disagreement Diagnoses",
        "The disagreement section asks a different question: why would someone disagree with your stance? It maps how charitable, severe, factual, spiritual, social, or affective your explanation of dissent becomes.",
    )
    story.append(
        two_col(
            [
                card("Soul diagnosis", "Disagreement is attributed to spiritual posture or condition: rebellion, resistance to God, or lack of regeneration.", ACCENT, SOFT),
                card("Method diagnosis", "Disagreement is attributed to reasoning, information, interpretation, factual assumptions, or competing principles.", BLUE, BLUE_SOFT),
                card("Social diagnosis", "Disagreement is attributed to denomination, church culture, politics, family norms, era, or social incentives.", GOLD, GOLD_SOFT),
                card("Affective diagnosis", "Disagreement is attributed to lived experience, trauma, fear, compassion, empathy, self-interest, or emotional salience.", GREEN, GREEN_SOFT),
            ]
        )
    )
    story.append(
        callout(
            "Charity test",
            "Can you state the strongest sincere, informed, non-rebellious reason a Christian might reach the opposite answer? If not, the disagreement diagnosis may be outrunning your evidence.",
            ACCENT,
            SOFT,
        )
    )
    sources = [
        ["Spiritual rebellion", "Soul", "The person resists God, truth, repentance, or moral accountability."],
        ["Unredeemed soul", "Soul", "The disagreement is attributed to not being spiritually regenerated."],
        ["Intellectual confusion", "Method", "The person is mistaken, unclear, inconsistent, or reasoning poorly."],
        ["Unfamiliarity with Scripture", "Method", "The person does not know the relevant texts or canonical context."],
        ["Bad interpretation", "Method", "The person knows the texts but applies a faulty hermeneutic."],
        ["Different factual beliefs", "Method", "The person accepts different empirical assumptions."],
        ["Different moral principle", "Method", "The person ranks duties, rights, mercy, justice, liberty, or authority differently."],
        ["Cultural conditioning", "Social", "Community, era, politics, or incentives shape the judgment."],
        ["Denominational formation", "Social", "The disagreement follows from church tradition, training, or institutional identity."],
        ["Personal experience", "Affective", "Lived experience, trauma, empathy, fear, or trust patterns affect the case."],
        ["Self-interest or fear", "Affective", "The person has something to gain, avoid, protect, or signal."],
        ["Compassion emphasis", "Affective", "The person gives mercy, care, harm reduction, or vulnerability more weight."],
    ]
    story.append(data_table([["Source", "Family", "Meaning"]] + sources, [1.58 * inch, 0.72 * inch, 4.1 * inch], "TableBodyTight"))
    story.append(PageBreak())

    section(story, "9. Dashboard, Ledger, and Status")
    story.append(
        data_table(
            [
                ["Element", "Meaning"],
                ["Current moral particular strip", "The always-visible reminder of which case is being edited."],
                ["Cases mapped", "How many of the 13 cases meet the mapped-case rule."],
                ["Current judgment", "The stance selected for the current case."],
                ["Lead grounder", "The highest nonzero grounder for the current case. Ties sort by label."],
                ["Disagreement lens", "The strongest family of disagreement diagnosis for the current case."],
                ["Open", "No visible input has been entered."],
                ["Partial", "Some input exists, but the case lacks a valid stance, grounder, or disagreement weight."],
                ["Mapped", "The case has enough input to contribute to cross-case pattern checks."],
                ["Most used grounders", "Grounder totals across cases with grounder input. This shows load, not truth."],
            ],
            [1.8 * inch, 4.6 * inch],
        )
    )
    story.append(
        callout(
            "Practical habit",
            "Before moving a slider, glance at the current moral particular strip. The most common user error is editing one case while mentally thinking about another.",
            BLUE,
            BLUE_SOFT,
        )
    )
    section(story, "10. Grounder Concentration Map")
    story.append(
        p(
            "The concentration map exists because lists hide distribution. A grounder can look important because it is broadly used, or because one case gives it a very high weight.",
            "BodyX",
        )
    )
    story.append(
        data_table(
            [
                ["Map term", "How to read it"],
                ["Lane", "Each numbered lane is one possible grounder."],
                ["Average weight", "Grounder total across fully mapped cases divided by fully mapped case count."],
                ["Coverage", "How many fully mapped cases give that grounder any nonzero weight."],
                ["Distributed", "The grounder appears across at least two-thirds of mapped cases and is not concentrated."],
                ["Concentrated", "At least 7 total weight plus narrow coverage, narrow effective spread, or a top-case share of at least two-thirds."],
            ],
            [1.45 * inch, 4.95 * inch],
            "TableBodyTight",
        )
    )
    story.append(PageBreak())

    section(story, "11. Numerical Rules Behind the Map")
    story.append(
        data_table(
            [
                ["Calculation", "Formula / rule"],
                ["Mapped denominator", "Only fully mapped cases count in the concentration map denominator."],
                ["Average", "total weight / mapped case count."],
                ["Coverage share", "active mapped cases / mapped case count."],
                ["Top-case share", "largest single case weight / total grounder weight."],
                ["Effective spread", "total^2 / sum(each active case weight^2)."],
                ["Concentrated", "mapped count >= 2, total >= 7, and one concentration trigger is met."],
                ["Concentration triggers", "coverage share <= 1/3, effective spread share <= 1/3, or top-case share >= 2/3."],
                ["Distributed", "mapped count >= 3, coverage share >= 2/3, and not concentrated."],
            ],
            [1.6 * inch, 4.8 * inch],
        )
    )
    story.append(
        callout(
            "Why effective spread helps",
            "If a grounder has weights 10, 1, and 1, simple coverage says 3 cases. Effective spread says the grounder behaves closer to 1.4 equally weighted cases. That reveals a hidden spike.",
            BLUE,
            BLUE_SOFT,
        )
    )
    section(story, "12. Pattern Checks")
    story.append(
        data_table(
            [
                ["Pattern", "What it asks you to inspect"],
                ["Thin sample", "Fewer than three cases are mapped, so cross-case patterns may be accidental."],
                ["Social norms doing work", "A fully mapped case gives Social norms a strong weight of 7/10 or higher."],
                ["Spiritualized disagreement", "A mapped case diagnoses disagreement mainly through soul categories."],
                ["Obligation without permission", "Case 1a is supported while case 1b is opposed."],
                ["Lethal-force boundary", "A killing-related statement is supported and needs a limiting rule."],
                ["Dominant dependency", "One grounder carries the largest combined slider total among cases with grounder input."],
                ["Missing support structure", "A stance exists without both grounder and disagreement weights."],
            ],
            [1.85 * inch, 4.55 * inch],
            "TableBodyTight",
        )
    )
    story.append(PageBreak())

    section(story, "13. Worked Walk-Throughs")
    story.append(p("These examples are not recommended answers. They show how the tool helps a user see the structure of an answer.", "Muted"))
    story.append(
        two_col(
            [
                card(
                    "Example A: Remarriage",
                    "A user opposes the broad claim that all divorced individuals are immoral if they remarry. Scripture receives moderate weight, reason and pastoral harm receive strong weight, and qualifiers name abandonment, abuse, repentance, and covenant breach.",
                    ACCENT,
                    SOFT,
                ),
                card(
                    "Example B: Speed limits",
                    "A user supports the statement lightly. Civil obedience, conscience, and consequences receive low to moderate weights. Social norms are also marked because common speeding makes the wrongness feel less serious.",
                    BLUE,
                    BLUE_SOFT,
                ),
                card(
                    "Example C: Lethal-force cases",
                    "A user strongly opposes private killing while affirming fetal personhood. Opposition is carried by authority, proportionality, legal order, evidence threshold, and non-reciprocity.",
                    GREEN,
                    GREEN_SOFT,
                ),
                card(
                    "Example D: Soul-coded disagreement",
                    "A user repeatedly marks rebellion and unredeemed soul as why others disagree. The attribution balance reveals the pattern and asks what would count as sincere informed disagreement.",
                    GOLD,
                    GOLD_SOFT,
                ),
            ]
        )
    )
    section(story, "14. Exporting and Responsible Use")
    story.append(
        p(
            "The Report and Structured stress-test prompt export the full case ledger, not only the selected case. That is intentional: the most useful critique often depends on cross-case comparison.",
            "BodyX",
        )
    )
    story.append(
        bullet_list(
            [
                "Use the report when you want a human-readable record of stances, grounders, disagreement weights, and qualifiers.",
                "Use the AI prompt when you want another system to critique the full map for grounding gaps, inconsistent distinctions, and missing limiting principles.",
                "Ask for the strongest fair repair attempt, not only the strongest attack.",
                "Treat any AI response as a pressure test, not as moral authority.",
            ]
        )
    )
    story.append(
        callout(
            "Responsible use",
            "Use the tool to clarify your own judgment, compare adjacent cases, notice severe disagreement diagnoses, and strengthen moral reflection. Do not use it to declare another person insincere, treat a pattern card as a verdict, or authorize coercion, threat, or harm.",
            ACCENT,
            SOFT,
        )
    )
    story.append(PageBreak())

    section(story, "Quick Reference")
    story.append(
        data_table(
            [
                ["Question", "Where to look"],
                ["Which case am I editing?", "Current moral particular strip and the active card marker."],
                ["What is my stance?", "Judgment and grounders, then Current judgment in the dashboard."],
                ["What carries the stance?", "Grounder sliders, Lead grounder, Most used grounders, and the concentration map."],
                ["Why do I think someone disagrees?", "Disagreement sliders and Attribution balance."],
                ["Is a case complete?", "Case list status: Open, Partial, or Mapped."],
                ["Where are cross-case risks?", "Consistency checks and the grounder concentration map."],
                ["How do I share the result?", "Report and Structured stress-test prompt."],
            ],
            [2.3 * inch, 4.1 * inch],
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        callout(
            "Final counsel",
            "Do not rush to make the ledger flattering. The point is not to win the tool. The point is to make your moral reasoning clear enough that it can be tested with courage and repaired with honesty.",
            ACCENT,
            SOFT,
        )
    )
    story.append(Spacer(1, 6))
    story.append(
        callout(
            "Three-session practice plan",
            "Session 1: map four cases you think are easy. Session 2: map four cases that unsettle you. Session 3: compare the concentration map and pattern checks, then revise only where the ledger exposed a real problem.",
            GREEN,
            GREEN_SOFT,
        )
    )
    story.append(Spacer(1, 6))
    story.append(p("Revised PDF generated from scripts/generate_moral_particulars_manual.py.", "Tiny"))
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.72 * inch,
        leftMargin=0.72 * inch,
        topMargin=0.72 * inch,
        bottomMargin=0.70 * inch,
        title="Moral Particulars Audit Manual - Revised Edition",
        author="Phil Stilwell",
        subject="Manual for the Moral Particulars Audit tool",
    )
    doc.build(build_story(), onFirstPage=cover, onLaterPages=on_page)
    print(OUTPUT)


if __name__ == "__main__":
    main()
