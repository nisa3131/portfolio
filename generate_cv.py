from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Image

root=Path(__file__).resolve().parent
styles=getSampleStyleSheet()
styles.add(ParagraphStyle(name="NameCV",fontName="Helvetica-Bold",fontSize=14,leading=17,spaceAfter=5,textColor=colors.HexColor("#152d43")))
styles.add(ParagraphStyle(name="BodyCV",fontName="Helvetica",fontSize=8.6,leading=12.1,spaceAfter=4,textColor=colors.HexColor("#29333d")))
styles.add(ParagraphStyle(name="HeadCV",parent=styles["BodyCV"],fontName="Helvetica-Bold",fontSize=10.1,leading=13,spaceBefore=9,spaceAfter=5,textColor=colors.HexColor("#19374f")))
styles.add(ParagraphStyle(name="EntryCV",parent=styles["BodyCV"],spaceAfter=5))
def p(t,style="BodyCV"): return Paragraph(t,styles[style])
def heading(t): return p(t,"HeadCV")
story=[]
left=[p("NUSRAT TABASSUM BINTE NOWSHER NISA","NameCV"),
      p("B.Sc. in Computer Science &amp; Engineering (9th Semester) | AI Major"),
      p("Dhaka, Bangladesh | +880 1601-804068 | tabassumnusrat1010@gmail.com"),
      p('<link href="https://nisa3131.github.io/portfolio/" color="#173a5d"><u>https://nisa3131.github.io/portfolio/</u></link>'),
      p('<link href="https://github.com/nisa3131" color="#173a5d"><u>https://github.com/nisa3131</u></link>'),
      p('<link href="https://www.linkedin.com/in/nusrat-tabassum-nisa-0b7811408" color="#173a5d"><u>LinkedIn: linkedin.com/in/nusrat-tabassum-nisa-0b7811408</u></link>')]
photo=Image(str(root/"portfolio_photo_highres.jpg"),width=1.22*inch,height=1.39*inch)
photo.hAlign="RIGHT"
tab=Table([[left,photo]],colWidths=[5.55*inch,1.25*inch],hAlign="LEFT")
tab.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),4),("TOPPADDING",(0,0),(-1,-1),0),("BOTTOMPADDING",(0,0),(-1,-1),0)]))
story.extend([tab,Spacer(1,8),heading("PROFILE"),
p("B.Sc. in Computer Science &amp; Engineering student (9th semester, major in Artificial Intelligence) at Daffodil International University. Contributor to three IEEE conference papers (two published and presented; one accepted) covering machine-learning cybersecurity and medical image segmentation. Former CodeAlpha Data Science intern with experience in ML systems, digital health, robotics and disaster risk."),
heading("EDUCATION"),
p("<b>Daffodil International University</b> | 2023-2027 (expected)"),
p("B.Sc. in Computer Science &amp; Engineering - Major in Artificial Intelligence | 9th Semester | CGPA 3.35/4.00 (through 8th semester)"),
p("<b>Savar Cantonment Public School and College</b> | HSC, 2022 | GPA: 5.00/5.00"),
p("<b>Savar Cantonment Public School and College</b> | SSC, 2020 | GPA: 5.00/5.00"),
heading("EXPERIENCE"),
p("<b>Data Science Intern (Virtual) - CodeAlpha</b> | 1-30 October 2026"),
p("Completed four end-to-end data-science projects: Sales Prediction, Car Price Prediction, Unemployment Analysis and Iris Flower Classification. Work covered cleaning, EDA, feature engineering, model comparison and held-out evaluation."),
heading("PROJECTS")])
projects=[
("Pahar Prohori - NISAR-Powered Landslide Early-Warning System","NASA Space Apps 2026; Galactic Problem Solver. Random Forest fusion of ground sensors and stored NISAR features; SAFE/WATCH/DANGER categorization, bilingual alerts and shelter routing. Python, FastAPI, scikit-learn, Expo/React Native, Leaflet. github.com/nisa3131/NasaSpaceAppChallenge"),
("BizMind AI","Multi-tenant document intelligence and customer-support platform with PDF/FAQ ingestion, cited answers, tenant-filtered retrieval and analytics. React, TypeScript, FastAPI, SQLite, ChromaDB, Docker. github.com/nisa3131/BizMind-AI"),
("PromptGuard","ML-assisted prompt security gateway with TF-IDF/logistic regression and rule-based detection, API key controls and monitoring dashboard. Python, FastAPI, React, TypeScript, SQLite, Docker. github.com/nisa3131/PromptGuard"),
("ShasthoBondhu AI - Rural NCD Risk Screening","IEEE ICADHI 2026 idea competition. Bangla voice-first, offline-first community health screening concept; Green/Amber/Red risk triage. github.com/nisa3131/sastho-bondhu-ai"),
("Autonomous AI Laboratory Assistant & Life-Saving Rover","I4N 2026 innovation competition. Raspberry Pi 5, YOLOv8-Nano, Arduino interlocks, 4-DOF robotic arm and dual-sensor hazard confirmation."),
("Sales Prediction","Quadratic ridge regression; test MAE 0.485, R-squared 0.988. github.com/nisa3131/_SalesPrediction"),
("Car Price Prediction","Random Forest regression, feature engineering and held-out testing. github.com/nisa3131/_CarPricePrediction"),
("Iris Flower Classification","Group-aware model evaluation; 30/30 held-out predictions correct. github.com/nisa3131/_IrisFlowerClassification"),
("Unemployment Analysis","Data cleaning, visual analysis and regional trends. github.com/nisa3131/_UnemploymentAnalysis"),
("Student Management System","Student-record management application in C. github.com/nisa3131/Student-Management-System")]
from xml.sax.saxutils import escape
for title, detail in projects:
 import re
 linkpattern=re.compile(r"github[.]com/nisa3131/[A-Za-z0-9_/-]+")
 def clickable(m):
  v=m.group(0)
  return f"<link href='https://{v}' color='#173a5d'><u>https://{v}</u></link>"
 story.append(p("<b>"+escape(title)+"</b> - "+linkpattern.sub(clickable,escape(detail)),"EntryCV"))
story.extend([heading("RESEARCH &amp; PUBLICATIONS"),
p("<b>1. Comparative Evaluation of CNN, Hybrid, and Transformer Architectures for Nuclei Segmentation in Histopathology.</b> IEEE BECITHCON 2026, Dhaka - Accepted; DOI forthcoming."),
p("<b>2. A Comparative Machine Learning Approach for Multi-Class Cyber Attack Classification.</b> IEEE QPAIN 2026 - Published and presented. DOI: <link href='https://doi.org/10.1109/QPAIN69676.2026.11546059' color='#173a5d'><u>https://doi.org/10.1109/QPAIN69676.2026.11546059</u></link>."),
p("<b>3. Identifying Malicious and Benign Prompts in AI Agent Evasion Attacks Using Machine Learning.</b> IEEE QPAIN 2026 - Published and presented. DOI: <link href='https://doi.org/10.1109/QPAIN69676.2026.11546222' color='#173a5d'><u>https://doi.org/10.1109/QPAIN69676.2026.11546222</u></link>."),
heading("TECHNICAL SKILLS"),
p("<b>Languages:</b> Python, C++, C, SQL, JavaScript, TypeScript. <b>ML/Data:</b> scikit-learn, pandas, NumPy, Matplotlib, Jupyter, CNN/Transformer segmentation, YOLOv8."),
p("<b>Development and Hardware:</b> FastAPI, SQLite, REST APIs, React Native/Expo, Leaflet, Docker, Git/GitHub, Raspberry Pi 5, Arduino UNO, GSM SIM800L."),
heading("CERTIFICATIONS &amp; AWARDS"),
p("NASA Space Apps 2026 - Galactic Problem Solver; IEEE QPAIN 2026 - two Presentation Certificates; IEEE ICADHI 2026 and I4N 2026 - Participation; AWS Academy Cloud Foundations; Health Informatics Research Workshop; SearchMaster."),
heading("LEADERSHIP &amp; ACTIVITIES"),
p("Campus Associate (Executive Member), International Leadership Competition 2.0; Executive Member, CPC and Research &amp; Journal Wing, DIU; former Executive Member, Girls' Computer Programming Club."),
heading("REFERENCE"),
p("<b>Dr. Md Alamgir Kabir</b> | Associate Professor &amp; Director, MSc in CSE"),
p("Department of Computer Science and Engineering, Faculty of Science and Information Technology, Daffodil International University"),
p("Email: kabir.cse@diu.edu.bd | Office: +8809617901233 | Mobile: +88 01723034458"),
p('Faculty profile: <link href="https://faculty.daffodilvarsity.edu.bd/profile/cse/alamgirkabir.html" color="#173a5d"><u>https://faculty.daffodilvarsity.edu.bd/profile/cse/alamgirkabir.html</u></link>')])
doc=SimpleDocTemplate(str(root/"Nusrat_Tabassum_Nisa_CV.pdf"),pagesize=A4,
 leftMargin=0.65*inch,rightMargin=0.65*inch,topMargin=0.55*inch,bottomMargin=0.52*inch,
 title="Nusrat Tabassum Binte Nowsher Nisa - CV")
doc.build(story)
print("Created",root/"Nusrat_Tabassum_Nisa_CV.pdf")
