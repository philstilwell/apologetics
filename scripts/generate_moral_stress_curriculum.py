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
OUTPUT = ROOT / "output" / "pdf" / "moral-system-stress-test-curriculum.pdf"


PALETTE = {
    "ink": colors.HexColor("#241406"),
    "muted": colors.HexColor("#604735"),
    "paper": colors.HexColor("#fff6df"),
    "card": colors.HexColor("#fffaf0"),
    "cream": colors.HexColor("#fff1c7"),
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
    ("Moral Meaning", "What do moral words mean?", "Prevents moral language from collapsing into approval, disgust, usefulness, or authority words."),
    ("Truth Maker", "What makes moral claims true?", "Prevents moral claims from becoming attitudes, commands, or social signals."),
    ("Authority Check", "How is authority tested as morally trustworthy?", "Prevents moral reasoning from becoming bare obedience to an assumed authority."),
    ("Moral Access", "How can accountable people know the standard?", "Prevents obligation from becoming hidden, private, or inaccessible."),
    ("Binding Force", "Why does the standard obligate?", "Prevents morality from thinning into advice, reward, threat, or strategy."),
    ("Case Guidance", "How does the system decide hard cases?", "Prevents broad ideals from replacing action-guiding principles."),
    ("Consistent Scope", "Who is bound, and are like cases treated alike?", "Prevents tribal, historical, or authority-favored exceptions."),
    ("Correction Method", "How are mistaken interpretations repaired?", "Prevents every revision from becoming ad hoc convenience."),
]


SOURCE_ROUTES = [
    ("God's nature", "Goodness is grounded in God's character.", "Must explain how that nature is identified as good without circularity."),
    ("Divine command", "Obligation is grounded in God's commands.", "Must explain why command is morally good rather than merely authoritative."),
    ("Scripture", "Moral guidance is revealed in biblical texts.", "Must supply interpretation rules and handle sincere disagreement."),
    ("Holy Spirit guidance", "Moral knowledge is guided by divine inner work.", "Must distinguish guidance from intuition, bias, and incompatible reports."),
    ("Church tradition", "The community's teaching tradition helps interpret morality.", "Must explain authority, correction, and disagreement across traditions."),
    ("Conscience or intuition", "Moral knowledge is recognized inwardly.", "Must explain why some intuitions track truth and others mislead."),
    ("Reason or natural law", "Reason detects moral structure in human nature or creation.", "Must show why the discovered order is morally binding."),
    ("Human flourishing", "Moral truths are tied to what helps persons and communities flourish.", "Must bridge usefulness to obligation."),
    ("Hybrid Christian account", "Several routes share the load.", "Must say which part carries which component without contradiction."),
]


BOUNDARY_TESTS = [
    ("Emotion", "Is this more than feeling, empathy, disgust, conscience, approval, or preference?"),
    ("Obedience", "Is this more than submission to an authority already assumed to be moral?"),
    ("Practical", "Is this more than usefulness, social benefit, safety, or flourishing strategy?"),
    ("Guidance", "Can this decide hard cases and rank duties before the desired conclusion is chosen?"),
]


SESSIONS = [
    {
        "number": 1,
        "title": "Moral Claims Are Not Moral Systems",
        "essential": "What extra structure is needed before a moral claim becomes part of a coherent objective moral system?",
        "outcomes": [
            "Distinguish moral reactions, commands, advice, claims, and systems.",
            "Explain why a list of moral claims is not yet a moral system.",
            "Practice asking for missing structure without sounding hostile.",
        ],
        "prep": "Print the claim cards. Prepare five baskets or columns: feeling, command, advice, moral claim, system element.",
        "opening": "Ask students to finish: 'When I say something is wrong, I usually mean...' Collect answers without correction.",
        "teach": "Give the central distinction: a moral system must supply meaning, truth, authority, access, force, guidance, scope, and correction. A source may be important, but a source is not the whole system.",
        "lab": "Claim-sort lab. Students sort statements such as 'cruelty disgusts me,' 'God forbids murder,' 'kindness helps society,' and 'lying is wrong.' Then they explain what would have to be added for each to become system-level.",
        "creative": "Run a 'moral courtroom' improvisation. One student plays a claim; others play meaning, truth, authority, access, force, guidance, scope, and correction. The claim cannot enter the courtroom until each role has been addressed.",
        "debrief": "Which statements felt moral but did not yet supply a system? Which missing part was easiest to overlook?",
        "homework": "Bring one moral claim from a sermon, family rule, social media post, or personal conviction. Write what it supplies and what it leaves unspecified.",
        "artifact": "Claim classification sheet",
    },
    {
        "number": 2,
        "title": "Moral Meaning",
        "essential": "What do moral words mean before we use them to argue for objectivity?",
        "outcomes": [
            "Define wrong, good, duty, evil, and obligation without circular slogans.",
            "Separate moral meaning from dislike, disgust, usefulness, and command.",
            "Use translation tests to detect unstable moral language.",
        ],
        "prep": "Prepare the moral word translation worksheet and a board with five columns: disliked, forbidden, harmful, unwise, objectively wrong.",
        "opening": "Ask whether 'That is wrong' means the same thing as 'I hate that.' Let students locate the difference.",
        "teach": "Moral meaning asks what the words are doing. If wrong only means disliked, forbidden, or impractical, the claim has not yet reached objective moral meaning.",
        "lab": "Translation test. Replace moral terms in a claim with disliked, forbidden, harmful, unwise, or contrary to God's nature. Students decide which replacement preserves the original claim and which changes it.",
        "creative": "Create a 'word autopsy' wall. Students dissect one moral sentence and label what each moral word is supposed to contribute.",
        "debrief": "Which definitions smuggled in the word being defined? Which definitions made the claim less moral than it first sounded?",
        "homework": "Write two definitions of 'wrong': one weak and one stronger. Explain what the stronger definition adds.",
        "artifact": "Moral vocabulary sheet",
    },
    {
        "number": 3,
        "title": "Truth Maker",
        "essential": "If a moral claim is true, what makes it true?",
        "outcomes": [
            "Explain the difference between a truth-apt claim and an expression of feeling.",
            "Identify possible truth makers and test whether they do more than assert.",
            "Spot preference, power, agreement, and tradition when they are being treated as truth makers.",
        ],
        "prep": "Prepare comparison cards: math claim, historical claim, legal claim, taste claim, moral claim.",
        "opening": "Ask what makes 'the meeting starts at 7' true or false. Then ask what makes 'cruelty is wrong' true or false.",
        "teach": "A truth maker is the feature, fact, standard, relation, nature, or principle that explains why the claim is true. Naming a person, text, or emotion is not enough unless it explains truth.",
        "lab": "Truth-maker shelf. Teams place claims on shelves labeled measurement, record, law, taste, command, character, flourishing, reason, and unknown. They defend whether the shelf really makes the claim true.",
        "creative": "Stage a 'truth-maker speed date.' Each possible truth maker has ninety seconds to explain what it can and cannot ground.",
        "debrief": "Which proposed truth makers were only sources of information? Which actually tried to explain truth?",
        "homework": "For the claim brought in Session 1, name the proposed truth maker and one worry about it.",
        "artifact": "Truth-maker chart",
    },
    {
        "number": 4,
        "title": "Authority Check",
        "essential": "How can a moral authority be recognized without assuming it is already moral?",
        "outcomes": [
            "Distinguish power, command, status, and moral authority.",
            "Explain why authority needs a moral trustworthiness test.",
            "Ask non-circular questions about divine, scriptural, institutional, or inner authority claims.",
        ],
        "prep": "Prepare three authority cards that issue incompatible commands while each claims moral authority.",
        "opening": "Ask whether a command from a powerful person automatically makes an action morally right.",
        "teach": "Authority can communicate, enforce, or clarify a standard. But if authority is treated as moral only because it says so, the system risks becoming obedience rather than moral evaluation.",
        "lab": "Three authorities exercise. Teams receive incompatible commands from three alleged authorities. They must design a test that can select legitimate moral authority without assuming the answer.",
        "creative": "Run an 'authority audit press conference.' One student plays an authority; others ask what would count as evidence of moral failure.",
        "debrief": "What tests were genuinely moral? Which tests just repeated loyalty, power, tradition, or familiarity?",
        "homework": "Write three questions that could test a claimed moral authority without insulting the person who trusts it.",
        "artifact": "Authority-check protocol",
    },
    {
        "number": 5,
        "title": "Moral Access",
        "essential": "If people are morally accountable, how can they know what binds them?",
        "outcomes": [
            "Explain why moral access matters for accountability.",
            "Compare public methods, private conviction, texts, traditions, reason, and conscience.",
            "Practice resolving sincere disagreement without dismissing either person.",
        ],
        "prep": "Prepare disagreement pairs: two sincere people, same question, incompatible conclusions.",
        "opening": "Ask whether someone can be blamed for violating a rule they could not reasonably know.",
        "teach": "Objective obligations need enough access to guide accountable agents. Access does not require perfect agreement, but it does require a method for knowing, comparing, and correcting claims.",
        "lab": "Disagreement map. Students chart two sincere disagreement cases and identify what method could resolve or at least discipline the disagreement.",
        "creative": "Use a silent gallery walk. Each team posts a method of access; classmates add sticky notes naming strengths and blind spots.",
        "debrief": "Which access routes were public? Which were private? Which could outsiders fairly examine?",
        "homework": "Interview someone about how they know a moral claim is true. Classify the access route they use.",
        "artifact": "Moral access map",
    },
    {
        "number": 6,
        "title": "Binding Force",
        "essential": "Why does morality obligate instead of merely advising or rewarding?",
        "outcomes": [
            "Distinguish duty from benefit, prudence, fear, social approval, and reward.",
            "Explain why binding force must survive cost, secrecy, and disadvantage.",
            "Ask whether a route supplies obligation or only motivation.",
        ],
        "prep": "Prepare costly-duty scenarios: hidden honesty, unrewarded mercy, unpopular justice, costly loyalty.",
        "opening": "Ask whether 'this benefits you' means the same thing as 'you are morally required to do this.'",
        "teach": "Binding force explains why someone ought to comply even when noncompliance would be easier, safer, or more profitable. Motivation is not the same as obligation.",
        "lab": "Costly duty test. Students run several cases through reward, punishment, flourishing, command, and duty language. They identify which accounts explain obligation and which explain incentives.",
        "creative": "Play 'advice or obligation.' The teacher reads statements rapidly; students move to one side of the room for advice and the other for obligation, then defend edge cases.",
        "debrief": "Which explanations became practical advice? Which supplied a genuine 'ought'?",
        "homework": "Rewrite one prudential reason as a moral obligation only if you can add the missing bridge.",
        "artifact": "Binding force worksheet",
    },
    {
        "number": 7,
        "title": "Case Guidance",
        "essential": "Can the system decide hard cases before the preferred conclusion is known?",
        "outcomes": [
            "Explain why broad ideals need decision rules.",
            "Rank competing duties in hard cases.",
            "Identify when a method is being reverse engineered to protect a conclusion.",
        ],
        "prep": "Prepare case cards: lying to protect life, mercy versus punishment, loyalty versus justice, harm prevention versus promise keeping.",
        "opening": "Ask whether 'love your neighbor' decides every concrete case by itself.",
        "teach": "Case guidance requires principles that apply before the answer is chosen. A moral system needs rules for conflicts between duties, not just inspirational language.",
        "lab": "Moral triage board. Teams rank duties for each case and state the rule that decides the ranking.",
        "creative": "Use a rotating judge format. Each team decides one case; a second team appeals; a third team asks whether the rule would still work in a swapped case.",
        "debrief": "Which rules worked before the conclusion? Which rules appeared only after the group knew what it wanted?",
        "homework": "Choose one hard case and write the rule that decides it, then test the same rule on a similar case.",
        "artifact": "Duty-ranking grid",
    },
    {
        "number": 8,
        "title": "Consistent Scope",
        "essential": "Who is bound, and do like cases receive like treatment?",
        "outcomes": [
            "State the scope of a moral rule clearly.",
            "Detect special pleading for favored persons, groups, eras, or authorities.",
            "Apply same-case swaps to test consistency.",
        ],
        "prep": "Prepare same-case swap cards that change tribe, religion, gender, era, authority, or social status while preserving the morally relevant facts.",
        "opening": "Ask when an exception is legitimate and when it is special pleading.",
        "teach": "Objective morality needs a principled account of who is bound. Exceptions can be legitimate only when they rest on relevant moral differences.",
        "lab": "Same-case swap. Students judge a case, then swap the person, era, or authority. If the judgment changes, they must name the relevant moral difference.",
        "creative": "Build a 'scope fence.' Students place agents inside or outside the rule and attach reasons to every boundary.",
        "debrief": "Which exceptions were principled? Which protected a favored group or result?",
        "homework": "Find a moral rule that seems universal. List possible exceptions and classify them as principled or suspicious.",
        "artifact": "Scope and exception map",
    },
    {
        "number": 9,
        "title": "Correction Method",
        "essential": "How does a moral system identify and repair mistaken interpretation?",
        "outcomes": [
            "Explain why any moral community needs a correction method.",
            "Distinguish moral discovery, moral change, and convenient revision.",
            "Evaluate historical correction without presentism or defensiveness.",
        ],
        "prep": "Prepare historical and contemporary cases of moral revision: slavery, coercion, punishment, gender hierarchy, violence, generosity.",
        "opening": "Ask whether a community can sincerely inherit a wrong moral belief.",
        "teach": "A correction method names how error is detected and repaired. Without it, a community may call every inherited view right until it changes, and every change right after it happens.",
        "lab": "Revision diagnosis. Teams classify a shift as moral fact changed, interpretation improved, earlier judgment was wrong, or unclear. They must defend the correction rule.",
        "creative": "Hold a 'future council.' Students imagine a future generation challenging one of today's assumptions and ask what method should decide whether we were wrong.",
        "debrief": "Which correction methods were principled? Which simply blessed whatever the group currently believes?",
        "homework": "Write a correction rule that could revise a cherished belief without becoming ad hoc.",
        "artifact": "Correction method protocol",
    },
    {
        "number": 10,
        "title": "Source Routes and the Moral Truth Map",
        "essential": "Which sources are carrying which components, and how strong is the support?",
        "outcomes": [
            "Name the nine source routes used in the tool.",
            "Map each required component to a route and support strength.",
            "Interpret concentration, thin support, and hybrid accounts without overclaiming.",
        ],
        "prep": "Prepare route cards and a blank source-lane chart numbered 1 through 9.",
        "opening": "Ask students to name every source someone might appeal to for moral truth.",
        "teach": "Routes are not verdicts. They tell the tool which pathway is supposed to carry the component. The source map visualizes dependency, support strength, and check completion.",
        "lab": "Source map build. Teams assign each component of one claim to a source route, set support from 0 to 4, and draw horizontal lines for average route support.",
        "creative": "Run 'route defense stations.' Each station represents one source route. Students rotate and write what that route can supply, what it cannot supply, and what pressure it faces.",
        "debrief": "Was the system concentrated in one route? Was it a patchwork? Which route had the most responsibility?",
        "homework": "Complete a source map for the moral claim you have carried through the course.",
        "artifact": "Moral truth source map",
    },
    {
        "number": 11,
        "title": "Boundary Tests and Pressure Questions",
        "essential": "Does the account remain moral under pressure, or does it collapse into a nearby substitute?",
        "outcomes": [
            "Use the four boundary tests charitably and precisely.",
            "Explain what contributes pressure to a challenge.",
            "Ask one rigorous question at a time without turning the tool into a weapon.",
        ],
        "prep": "Prepare boundary cards and challenge cards tied to authority, access, meaning, history, guidance, and sufficiency.",
        "opening": "Ask whether a moral-sounding claim can secretly be only a feeling, command, or practical suggestion.",
        "teach": "Boundary tests ask whether the current account is distinct from emotion, obedience, practical advice, and vague guidance. Top pressure questions identify where the current setup most needs repair.",
        "lab": "Collapse diagnosis. Teams run a claim through all four boundaries, then choose the highest-pressure question and draft a fair version of it.",
        "creative": "Use a 'pressure clinic.' One team presents a claim. Other teams act as doctors, naming symptoms, likely diagnosis, and repair options.",
        "debrief": "Which pressure questions clarified the claim? Which versions sounded like gotchas and needed rewriting?",
        "homework": "Prepare your capstone claim with at least two pressure questions you are willing to answer.",
        "artifact": "Boundary and pressure worksheet",
    },
    {
        "number": 12,
        "title": "Capstone Moral-System Lab",
        "essential": "Can the proposed system survive a full, fair, component-by-component audit?",
        "outcomes": [
            "Present a moral-system claim clearly and narrowly.",
            "Substantiate all eight required components with routes, strength, and checks.",
            "Receive and answer boundary and pressure questions with intellectual honesty.",
        ],
        "prep": "Give students the capstone template in advance. Prepare rubrics, timer, and feedback forms.",
        "opening": "Remind students: the goal is not embarrassment. The goal is clarity, repair, and honest confidence.",
        "teach": "Review the capstone sequence: claim, components, source map, boundaries, pressure questions, repair plan.",
        "lab": "Each team presents for seven minutes, receives five minutes of questions, and names one repair move before leaving the hot seat.",
        "creative": "End with a 'clarity gallery.' Students post the strongest question they received and the best repair move they discovered.",
        "debrief": "What changed in your confidence, not just in level but in precision? Which component now seems most important?",
        "homework": "Write a one-page reflection: what I now require before calling a moral claim a coherent objective moral system.",
        "artifact": "Capstone audit packet",
    },
]


RUBRIC_ROWS = [
    ["Criterion", "Emerging", "Developing", "Strong", "Excellent"],
    ["Clarity", "Claim shifts or remains vague.", "Claim is mostly clear but still broad.", "Claim is narrow and stable.", "Claim is precise, testable, and stays stable under pressure."],
    ["Component coverage", "Several required parts are missing.", "Most parts are named but thin.", "All parts are addressed with some support.", "All parts are clearly substantiated and connected."],
    ["Non-circularity", "Assumes what it must explain.", "Notices circularity after prompting.", "Avoids major circular moves.", "Identifies and repairs subtle circularity."],
    ["Charity", "Treats questions as attacks.", "Answers politely but defensively.", "Receives questions as clarification.", "Improves the account through fair criticism."],
    ["Case guidance", "Cannot decide hard cases.", "Decides cases inconsistently.", "Uses a stable decision rule.", "Ranks duties and tests the rule across swapped cases."],
    ["Correction", "No repair method.", "Ad hoc repair method.", "Principled repair method.", "Can distinguish discovery, change, and mistaken interpretation."],
]


class SequenceStrip(Flowable):
    def __init__(self, width: float):
        super().__init__()
        self.width = width
        self.height = 92

    def draw(self) -> None:
        canvas = self.canv
        gap = 14
        card_width = (self.width - 2 * gap) / 3
        entries = [
            ("1", "Threshold", "Preliminary check: enough structure?"),
            ("2", "Stress Test", "Current tool: pressure the structure."),
            ("3", "Particulars", "Advanced case audit: apply it."),
        ]
        colors_for = [(PALETTE["gold"], PALETTE["gold_soft"]), (PALETTE["blue"], PALETTE["blue_soft"]), (PALETTE["red"], PALETTE["red_soft"])]
        for index, (number, title, copy) in enumerate(entries):
            accent, fill = colors_for[index]
            x = index * (card_width + gap)
            canvas.setFillColor(fill)
            canvas.setStrokeColor(accent)
            canvas.setLineWidth(1.2)
            canvas.roundRect(x, 8, card_width, 68, 9, stroke=1, fill=1)
            canvas.setFillColor(accent)
            canvas.circle(x + 20, 57, 10, stroke=0, fill=1)
            canvas.setFillColor(colors.white)
            canvas.setFont("Helvetica-Bold", 8.5)
            canvas.drawCentredString(x + 20, 53.7, number)
            canvas.setFillColor(PALETTE["ink"])
            canvas.setFont("Helvetica-Bold", 11.5)
            canvas.drawString(x + 36, 53, title)
            canvas.setFillColor(PALETTE["muted"])
            canvas.setFont("Helvetica", 8.2)
            text = canvas.beginText(x + 14, 38)
            text.setLeading(10)
            for line in wrap_words(copy, 4):
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


def styles():
    sheet = getSampleStyleSheet()
    body = ParagraphStyle(
        "CurriculumBody",
        parent=sheet["BodyText"],
        fontName="Helvetica",
        fontSize=9.4,
        leading=13.2,
        textColor=PALETTE["muted"],
        spaceAfter=0,
    )
    return {
        "kicker": ParagraphStyle(
            "Kicker",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=8.2,
            leading=10,
            textColor=PALETTE["gold"],
            alignment=TA_LEFT,
            spaceAfter=4,
        ),
        "cover_title": ParagraphStyle(
            "CoverTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=31,
            textColor=PALETTE["ink"],
            spaceAfter=8,
        ),
        "cover_subtitle": ParagraphStyle(
            "CoverSubtitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=PALETTE["gold"],
            spaceAfter=8,
        ),
        "section_title": ParagraphStyle(
            "SectionTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=18.4,
            leading=21.5,
            textColor=PALETTE["ink"],
            spaceAfter=6,
        ),
        "session_title": ParagraphStyle(
            "SessionTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=16.2,
            leading=19,
            textColor=PALETTE["ink"],
            spaceAfter=4,
        ),
        "body": body,
        "body_bold": ParagraphStyle(
            "BodyBold",
            parent=body,
            fontName="Helvetica-Bold",
            textColor=PALETTE["ink"],
        ),
        "small": ParagraphStyle(
            "Small",
            parent=body,
            fontSize=8.1,
            leading=10.8,
            textColor=PALETTE["muted"],
        ),
        "card_title": ParagraphStyle(
            "CardTitle",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=10.2,
            leading=12.5,
            textColor=PALETTE["ink"],
        ),
        "card_copy": ParagraphStyle(
            "CardCopy",
            parent=body,
            fontSize=8.05,
            leading=10.8,
            textColor=PALETTE["muted"],
        ),
        "table_head": ParagraphStyle(
            "TableHead",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=7.9,
            leading=10.1,
            textColor=PALETTE["ink"],
        ),
        "table_cell": ParagraphStyle(
            "TableCell",
            parent=body,
            fontSize=7.55,
            leading=10.1,
            textColor=PALETTE["muted"],
        ),
        "center_small": ParagraphStyle(
            "CenterSmall",
            parent=body,
            fontName="Helvetica-Bold",
            fontSize=8.05,
            leading=10,
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
        canvas.rect(0, height - 2.05 * inch, width, 2.05 * inch, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#f1d99b"))
        canvas.circle(width - 0.96 * inch, height - 0.72 * inch, 58, stroke=0, fill=1)
        canvas.setFillColor(colors.HexColor("#e4bd68"))
        canvas.circle(width - 1.16 * inch, height - 0.92 * inch, 31, stroke=0, fill=1)
        canvas.setFillColor(PALETTE["ink"])
        canvas.setFont("Helvetica-Bold", 44)
        canvas.drawCentredString(width - 0.98 * inch, height - 0.94 * inch, "X")
    else:
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, width, height, stroke=0, fill=1)
        canvas.setStrokeColor(colors.HexColor("#ead1a0"))
        canvas.setLineWidth(1.6)
        canvas.line(0.68 * inch, height - 0.67 * inch, width - 0.68 * inch, height - 0.67 * inch)
        canvas.setStrokeColor(colors.HexColor("#efe6d7"))
        canvas.setLineWidth(1)
        canvas.line(0.68 * inch, 0.55 * inch, width - 0.68 * inch, 0.55 * inch)
        canvas.setFillColor(PALETTE["gold"])
        canvas.setFont("Helvetica-Bold", 7.8)
        canvas.drawString(0.7 * inch, height - 0.55 * inch, "MORAL SYSTEM STRESS TEST CURRICULUM")
        canvas.setFillColor(PALETTE["ink"])
        canvas.setFont("Helvetica-Bold", 18)
        canvas.drawRightString(width - 0.7 * inch, height - 0.56 * inch, "X")
        canvas.setFillColor(PALETTE["muted"])
        canvas.setFont("Helvetica", 7.8)
        canvas.drawRightString(width - 0.7 * inch, 0.35 * inch, f"Page {doc.page}")
    canvas.restoreState()


def section(style_map, kicker: str, title: str, lede: str | None = None):
    flow = [Paragraph(kicker.upper(), style_map["kicker"]), Paragraph(title, style_map["section_title"])]
    if lede:
        flow.append(Paragraph(lede, style_map["body"]))
    return flow


def card(style_map, title: str, body: str, accent: colors.Color, fill: colors.Color, width: float):
    inner = [Paragraph(title, style_map["card_title"]), Spacer(1, 3), Paragraph(body, style_map["card_copy"])]
    table = Table([[inner]], colWidths=[width], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.85, accent),
                ("LINEBEFORE", (0, 0), (0, -1), 4, accent),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
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
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return table


def chip_row(style_map, chips: list[tuple[str, colors.Color, colors.Color]], total_width: float):
    col_width = total_width / len(chips)
    cells = []
    for label, border, fill in chips:
        cell = Table([[Paragraph(label, style_map["center_small"])]], colWidths=[col_width - 7])
        cell.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), fill),
                    ("BOX", (0, 0), (-1, -1), 0.8, border),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ]
            )
        )
        cells.append(cell)
    table = Table([cells], colWidths=[col_width] * len(chips), hAlign="LEFT")
    table.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    return table


def bullet_list(style_map, entries: list[str], style_name: str = "body"):
    return ListFlowable(
        [ListItem(Paragraph(entry, style_map[style_name]), leftIndent=10) for entry in entries],
        bulletType="bullet",
        bulletFontName="Helvetica-Bold",
        bulletColor=PALETTE["gold"],
        leftIndent=4,
        spaceBefore=0,
        spaceAfter=0,
    )


def rows_table(style_map, rows: list[list[str]], widths: list[float], header: bool = True):
    built = []
    for row_index, row in enumerate(rows):
        row_style = style_map["table_head"] if header and row_index == 0 else style_map["table_cell"]
        built.append([Paragraph(cell, row_style) for cell in row])
    table = Table(built, colWidths=widths, repeatRows=1 if header else 0)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PALETTE["gold_soft"] if header else colors.white),
                ("GRID", (0, 0), (-1, -1), 0.7, colors.HexColor("#dcc39e")),
                ("BACKGROUND", (0, 1 if header else 0), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def session_page(style_map, doc_width: float, session: dict):
    flow = []
    flow.append(Paragraph(f"SESSION {session['number']}", style_map["kicker"]))
    flow.append(Paragraph(session["title"], style_map["session_title"]))
    flow.append(
        card(
            style_map,
            "Essential question",
            session["essential"],
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    flow.append(Spacer(1, 7))
    flow.append(Paragraph("Learning outcomes", style_map["card_title"]))
    flow.append(bullet_list(style_map, session["outcomes"], "small"))
    flow.append(Spacer(1, 8))
    flow.append(
        two_column_cards(
            [
                card(style_map, "Teacher prep", session["prep"], PALETTE["blue"], PALETTE["blue_soft"], doc_width / 2 - 8),
                card(style_map, "Opening move", session["opening"], PALETTE["green"], PALETTE["green_soft"], doc_width / 2 - 8),
                card(style_map, "Core teaching", session["teach"], PALETTE["gold"], PALETTE["gold_soft"], doc_width / 2 - 8),
                card(style_map, "Main lab", session["lab"], PALETTE["red"], PALETTE["red_soft"], doc_width / 2 - 8),
                card(style_map, "Dynamic option", session["creative"], PALETTE["blue"], PALETTE["blue_soft"], doc_width / 2 - 8),
                card(style_map, "Debrief", session["debrief"], PALETTE["green"], PALETTE["green_soft"], doc_width / 2 - 8),
            ],
            doc_width,
        )
    )
    flow.append(Spacer(1, 1))
    flow.append(
        rows_table(
            style_map,
            [
                ["Take-home work", "Student artifact"],
                [session["homework"], session["artifact"]],
            ],
            [doc_width * 0.68, doc_width * 0.32],
        )
    )
    return flow


def build_story(doc_width: float):
    s = styles()
    story = []

    story.extend(
        section(
            s,
            "Small-group curriculum",
            "Building and Stress-Testing an Objective Moral System",
            "A full course for young, honest seekers learning how to identify the required parts of a coherent objective moral system and test whether a Christian moral claim actually supplies them.",
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        card(
            s,
            "Teacher posture",
            "Run this as a moral-system laboratory, not a debate club. The teacher is dynamic, curious, and creative, but the intellectual atmosphere is disciplined: every claim is welcome, every shortcut is slowed down, and every person is treated as more important than the argument.",
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
                ("Rigorous", PALETTE["blue"], PALETTE["blue_soft"]),
                ("Charitable", PALETTE["green"], PALETTE["green_soft"]),
                ("Concrete", PALETTE["gold"], PALETTE["gold_soft"]),
                ("Repair-oriented", PALETTE["red"], PALETTE["red_soft"]),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 16))
    story.append(Paragraph("INSIDE THIS CURRICULUM", s["kicker"]))
    story.append(
        rows_table(
            s,
            [
                ["1. Teacher guide", "2. Twelve sessions", "3. Student handouts"],
                ["4. Activities", "5. Rubrics", "6. Capstone lab"],
            ],
            [doc_width / 3] * 3,
            header=False,
        )
    )
    story.append(Spacer(1, 14))
    story.append(SequenceStrip(doc_width))
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Teacher guide",
            "Course identity and promises",
            "The course teaches students to ask what must be supplied before a moral claim can count as part of a coherent objective moral system. It does not require students to begin with the same worldview, and it does not reward cheap skepticism or defensive certainty.",
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        two_column_cards(
            [
                card(s, "Best group size", "Six to twelve students. Small enough for every student to speak; large enough for disagreement to be visible.", PALETTE["blue"], PALETTE["blue_soft"], doc_width / 2 - 8),
                card(s, "Recommended age", "Older teens, college students, or young adults who can handle disagreement with patience and care.", PALETTE["green"], PALETTE["green_soft"], doc_width / 2 - 8),
                card(s, "Default rhythm", "Twelve sessions of 75 to 100 minutes. Each meeting includes a concept, a lab activity, a debrief, and one artifact.", PALETTE["gold"], PALETTE["gold_soft"], doc_width / 2 - 8),
                card(s, "Teacher role", "Guide, coach, and creative pressure-tester. The teacher models precision, not dominance.", PALETTE["red"], PALETTE["red_soft"], doc_width / 2 - 8),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        card(
            s,
            "The sentence students should remember",
            "We are not asking whether this sounds moral. We are asking whether it supplies the structure needed to be a coherent objective moral system.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(Spacer(1, 12))
    story.extend(section(s, "Norms", "The covenant of inquiry"))
    story.append(
        bullet_list(
            s,
            [
                "Name the claim before criticizing it.",
                "Ask which component an answer is meant to supply.",
                "Treat missing structure as an invitation to clarify.",
                "Do not use the tool to humiliate, corner, or score people.",
                "Let strong answers become stronger; let weak answers become more precise.",
            ],
        )
    )
    story.append(PageBreak())

    story.extend(section(s, "Learning design", "Durable understandings and outcomes"))
    story.append(
        rows_table(
            s,
            [
                ["Durable understanding", "What students should be able to do"],
                ["A moral source is not yet a moral system.", "Distinguish a command, text, intuition, feeling, or practical benefit from a full moral architecture."],
                ["Objective morality requires structure.", "Explain meaning, truth, authority, access, force, guidance, scope, and correction."],
                ["A fair challenge is specific.", "Ask the relevant pressure question instead of attacking a whole worldview at once."],
                ["A high score is not a proof.", "Read the tool's numbers as prompts for attention, not verdicts about truth."],
                ["Honest inquiry repairs.", "Identify what would need to be added for a claim to become stronger."],
            ],
            [doc_width * 0.36, doc_width * 0.64],
        )
    )
    story.append(Spacer(1, 12))
    story.extend(section(s, "Assessment", "What good learning looks like"))
    story.append(
        chip_row(
            s,
            [
                ("Clarity", PALETTE["blue"], PALETTE["blue_soft"]),
                ("Non-circularity", PALETTE["gold"], PALETTE["gold_soft"]),
                ("Consistency", PALETTE["green"], PALETTE["green_soft"]),
                ("Charity", PALETTE["red"], PALETTE["red_soft"]),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 12))
    story.append(
        card(
            s,
            "What not to assess",
            "Do not grade students on whether they agree with the teacher, become skeptical, remain Christian, or reach a preferred conclusion. Grade the quality of the thinking: stable claims, clear components, honest support levels, fair questions, and principled repair moves.",
            PALETTE["red"],
            PALETTE["red_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Course map",
            "Twelve-session sequence",
            "Each session gives one core concept enough time to become usable. The capstone asks students to put the whole architecture together.",
        )
    )
    map_rows = [["Session", "Focus", "Core artifact"]]
    for session in SESSIONS:
        map_rows.append([str(session["number"]), session["title"], session["artifact"]])
    story.append(rows_table(s, map_rows, [doc_width * 0.12, doc_width * 0.52, doc_width * 0.36]))
    story.append(Spacer(1, 12))
    story.extend(section(s, "Flexible formats", "Ways to adapt the course"))
    story.append(
        two_column_cards(
            [
                card(s, "Six-week intensive", "Pair sessions 1-2, 3-4, 5-6, 7-8, 9-10, and 11-12. Keep the artifacts, but shorten debriefs.", PALETTE["blue"], PALETTE["blue_soft"], doc_width / 2 - 8),
                card(s, "Weekend retreat", "Use four blocks: architecture, source routes, boundary pressure, capstone. Assign the component table as pre-work.", PALETTE["green"], PALETTE["green_soft"], doc_width / 2 - 8),
                card(s, "Semester course", "Expand each session into two meetings: concept lab first, case lab second. Add peer feedback conferences before capstone.", PALETTE["gold"], PALETTE["gold_soft"], doc_width / 2 - 8),
                card(s, "Mentor pair", "Use one claim carried through all twelve sessions. The mentor asks questions; the student owns every repair move.", PALETTE["red"], PALETTE["red_soft"], doc_width / 2 - 8),
            ],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(
        section(
            s,
            "Core architecture",
            "The eight required components",
            "These are the conceptual anchors for the whole curriculum. Students do not need to memorize jargon; they need to understand the job each component performs.",
        )
    )
    component_rows = [["Component", "Student question", "Why it is necessary"]]
    component_rows.extend(COMPONENTS)
    story.append(rows_table(s, component_rows, [doc_width * 0.22, doc_width * 0.31, doc_width * 0.47]))
    story.append(Spacer(1, 12))
    story.append(
        card(
            s,
            "Teaching move",
            "When a student gives an answer, pause and ask: Which component did that answer just support? If the class cannot place it, the answer may be interesting but not yet structurally useful.",
            PALETTE["blue"],
            PALETTE["blue_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    for session in SESSIONS:
        story.extend(session_page(s, doc_width, session))
        story.append(PageBreak())

    story.extend(section(s, "Student handout", "Full moral-system audit sheet"))
    story.append(Paragraph("Use this page repeatedly. It is the bridge between the curriculum and the tool.", s["body"]))
    story.append(Spacer(1, 8))
    audit_rows = [["Component", "Primary route", "Support 0-4", "Checks complete?", "Repair note"]]
    for title, _, _ in COMPONENTS:
        audit_rows.append([title, "", "", "", ""])
    story.append(rows_table(s, audit_rows, [doc_width * 0.22, doc_width * 0.24, doc_width * 0.14, doc_width * 0.16, doc_width * 0.24]))
    story.append(Spacer(1, 12))
    story.append(
        card(
            s,
            "Strict readiness rule",
            "A component is ready only when the route is chosen, support is marked Supported or Strong, and the relevant checks are complete. A persuasive speech does not replace this structure.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(section(s, "Student handout", "Source route reference"))
    source_rows = [["Route", "What it claims to supply", "Question it must answer"]]
    source_rows.extend(SOURCE_ROUTES)
    story.append(rows_table(s, source_rows, [doc_width * 0.22, doc_width * 0.39, doc_width * 0.39]))
    story.append(PageBreak())

    story.extend(section(s, "Student handout", "Boundary and pressure worksheet"))
    boundary_rows = [["Boundary", "Question"]]
    boundary_rows.extend(BOUNDARY_TESTS)
    story.append(rows_table(s, boundary_rows, [doc_width * 0.23, doc_width * 0.77]))
    story.append(Spacer(1, 12))
    pressure_rows = [
        ["Pressure type", "Fair version of the question"],
        ["Meaning pressure", "What does the moral word add beyond approval, disgust, usefulness, or command?"],
        ["Truth pressure", "What makes the claim true even if individuals or cultures disagree?"],
        ["Authority pressure", "What would count as evidence that an authority claim is morally mistaken?"],
        ["Access pressure", "How can sincere, informed disagreement be disciplined or resolved?"],
        ["Guidance pressure", "What rule decides the hard case before the preferred answer is known?"],
        ["Scope pressure", "Would the same judgment apply if the person, group, era, or authority changed?"],
        ["Correction pressure", "What rule distinguishes moral discovery from convenient revision?"],
    ]
    story.append(rows_table(s, pressure_rows, [doc_width * 0.27, doc_width * 0.73]))
    story.append(PageBreak())

    story.extend(section(s, "Teacher toolkit", "Activity bank for a dynamic teacher"))
    activity_rows = [
        ["Activity", "Use it when", "How it works"],
        ["Claim sort", "Students confuse claims with systems.", "Sort statements into feeling, command, advice, claim, and system element."],
        ["Word autopsy", "Moral language is vague.", "Dissect one moral sentence and label what each term contributes."],
        ["Three authorities", "Authority is being assumed.", "Compare incompatible commands and design a moral trustworthiness test."],
        ["Same-case swap", "Scope is inconsistent.", "Change person, group, era, or authority while preserving the relevant facts."],
        ["Pressure clinic", "A claim needs repair.", "Students diagnose collapse risks and prescribe the next component to strengthen."],
        ["Future council", "Correction feels threatening.", "Imagine a future critique of today's moral confidence and test repair methods."],
        ["Source stations", "Routes are blurry.", "Teams rotate through source routes and list what each can and cannot supply."],
        ["Clarity gallery", "Students need synthesis.", "Post the strongest question, repair move, and remaining uncertainty after each capstone."],
    ]
    story.append(rows_table(s, activity_rows, [doc_width * 0.22, doc_width * 0.28, doc_width * 0.50]))
    story.append(Spacer(1, 12))
    story.append(
        card(
            s,
            "Improvisation rule",
            "The teacher can be theatrical, playful, and surprising, but the improvisation must always serve the same discipline: name the claim, locate the component, test the support, and ask the next fair question.",
            PALETTE["green"],
            PALETTE["green_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(section(s, "Teacher toolkit", "Facilitating difficult moments"))
    difficult_rows = [
        ["Moment", "Teacher response"],
        ["A student feels their faith is under attack.", "Slow the pace. Say: 'We are not grading your sincerity. We are asking which part of the system this answer supplies.'"],
        ["A skeptic becomes triumphant.", "Redirect from victory to repair. Ask: 'What would a stronger answer need to add?'"],
        ["The group drifts into culture-war debate.", "Return to architecture. Ask which component is being discussed and which evidence is relevant."],
        ["Someone uses a slogan repeatedly.", "Affirm the concern, then ask for the decision rule, truth maker, or access method behind it."],
        ["A student says everything is subjective.", "Ask them to classify that statement: feeling, claim, system, or practical stance. Do not let it bypass the same standards."],
        ["A student is silent.", "Give a written role: meaning watcher, authority watcher, guidance watcher, or repair watcher."],
    ]
    story.append(rows_table(s, difficult_rows, [doc_width * 0.34, doc_width * 0.66]))
    story.append(Spacer(1, 12))
    story.append(
        card(
            s,
            "Emotional safety without intellectual softness",
            "Students should feel respected, not protected from hard questions. Keep tone gentle and standards firm. That combination is the heart of the curriculum.",
            PALETTE["blue"],
            PALETTE["blue_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(section(s, "Capstone", "Final moral-system lab"))
    capstone_rows = [
        ["Presentation part", "What students must provide"],
        ["Claim", "A narrow moral-system claim stated in one or two sentences."],
        ["Eight components", "For each component: route, support strength, completed checks, and one repair note if weak."],
        ["Source map", "A visual or table showing which routes carry which components."],
        ["Boundary tests", "One sentence on emotion, obedience, practical, and guidance boundaries."],
        ["Pressure questions", "Two hard questions the team is willing to answer honestly."],
        ["Repair plan", "One specific change that would strengthen the system if the current answer is thin."],
    ]
    story.append(rows_table(s, capstone_rows, [doc_width * 0.28, doc_width * 0.72]))
    story.append(Spacer(1, 12))
    story.append(
        two_column_cards(
            [
                card(s, "Timing", "Seven minutes presentation, five minutes questions, three minutes repair statement.", PALETTE["blue"], PALETTE["blue_soft"], doc_width / 2 - 8),
                card(s, "Question rule", "Questioners may ask only about a component, route, boundary, or pressure point. No speeches disguised as questions.", PALETTE["red"], PALETTE["red_soft"], doc_width / 2 - 8),
            ],
            doc_width,
        )
    )
    story.append(Spacer(1, 8))
    story.append(
        card(
            s,
            "Capstone closing prompt",
            "What changed in your confidence? Do not answer only higher or lower. Answer more precise, less circular, better grounded, more humble, or more repairable.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(section(s, "Rubric", "Evaluate thinking, not agreement"))
    story.append(rows_table(s, RUBRIC_ROWS, [doc_width * 0.16, doc_width * 0.20, doc_width * 0.20, doc_width * 0.21, doc_width * 0.23]))
    story.append(Spacer(1, 12))
    story.append(
        card(
            s,
            "Teacher note",
            "A student can receive high marks while defending a Christian account, doubting one, or remaining undecided. The rubric rewards intellectual honesty and structural clarity.",
            PALETTE["green"],
            PALETTE["green_soft"],
            doc_width,
        )
    )
    story.append(PageBreak())

    story.extend(section(s, "Final field guide", "The questions students should carry with them"))
    final_rows = [
        ["When you hear...", "Ask..."],
        ["That is wrong.", "What does wrong mean here?"],
        ["God commands it.", "How is that authority recognized as morally trustworthy?"],
        ["The Bible teaches it.", "Which interpretive rule decides the disputed case, and why that rule?"],
        ["I know it in my conscience.", "How do we test conscience when sincere people disagree?"],
        ["It helps people flourish.", "Why is flourishing morally binding rather than merely good advice?"],
        ["Love decides it.", "What does love require when duties conflict?"],
        ["That was acceptable then.", "Did the moral fact change, or did interpretation improve?"],
        ["Everyone knows this.", "Who is everyone, and what access method makes the claim knowable?"],
    ]
    story.append(rows_table(s, final_rows, [doc_width * 0.34, doc_width * 0.66]))
    story.append(Spacer(1, 14))
    story.append(
        card(
            s,
            "The final habit",
            "Before accepting or rejecting a moral-system claim, ask what it supplies for meaning, truth, authority, access, force, guidance, scope, and correction. That habit is the curriculum.",
            PALETTE["gold"],
            PALETTE["gold_soft"],
            doc_width,
        )
    )
    return story


def build_pdf(output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    margin = 0.68 * inch
    frame = Frame(
        margin,
        0.73 * inch,
        letter[0] - 2 * margin,
        letter[1] - 1.55 * inch,
        id="body",
    )
    doc = BaseDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=0.82 * inch,
        bottomMargin=0.73 * inch,
        title="Moral System Stress Test Curriculum",
        author="Phil Stilwell",
        subject="Curriculum for teaching the Moral System Stress Test",
    )
    doc.addPageTemplates([PageTemplate(id="curriculum", frames=[frame], onPage=page_background)])
    doc.build(build_story(frame._width))


if __name__ == "__main__":
    build_pdf(OUTPUT)
