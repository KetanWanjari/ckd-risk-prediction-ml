**🩺 Early Prediction and Progression Analysis of Chronic Kidney Disease Using Machine Learning
📌 **Project Overview**
Chronic Kidney Disease (CKD) is a long-term medical condition that often progresses silently until it reaches an advanced stage. Early detection plays a critical role in preventing severe complications and improving patient outcomes.
This project presents a machine learning–based web application that predicts the risk of Chronic Kidney Disease using key clinical parameters. The system assists in early screening and risk assessment, enabling timely medical intervention.

🎯 **Objectives**

1.To develop a machine learning model for early prediction of CKD
2.To analyze the influence of important clinical parameters on CKD risk
3.To provide a user-friendly web interface for real-time prediction
4.To support early diagnosis and preventive healthcare decision-making

**🛠️ Technologies Used**
**Programming & Development**
**Programming Language**: Python
**Backend Framework**: Flask
**Frontend Technologies**: HTML, CSS
**Development Tools**: VS Code, Git, GitHub

**Machine Learning**
**Algorithms Used:**
Logistic Regression
Decision Tree
Random Forest
**Libraries**: NumPy, Pandas, Scikit-learn

**Dataset**
Source: UCI / Kaggle Chronic Kidney Disease Dataset
Data Type: Clinical and laboratory test data

**Model Evaluation**
Accuracy
Precision
Recall
F1-score
Confusion Matrix

📊 **Key Clinical Parameters Used**
Age
Blood Pressure
Serum Creatinine
Blood Urea
Hemoglobin
Albumin
Sugar
Specific Gravity

These parameters play a significant role in determining kidney function and disease progression.

⚙️**System Architecture**

1. User enters clinical data through the web interface
2.Input data is preprocessed and validated
3.Machine learning model analyzes the data
4.CKD risk prediction and confidence score are generated
5.Results are displayed instantly on the web application

✅ **Results and Observations**

1.Healthy individual test cases were correctly classified as non-CKD
2.High-risk patient data showed accurate CKD risk prediction
3.Key medical features significantly influenced prediction outcomes
4.The system provides fast and easy-to-understand results suitable for early screening

🚧 **Work in Progress**
Database integration for storing prediction history
Model optimization and hyperparameter tuning
Improved user interface and visualization features

🔮 **Future Enhancements**

1.Integration with real-time hospital or lab data systems
2.Use of advanced models such as XGBoost or Neural Networks
3.Explainable AI (XAI) techniques for medical transparency
4.Mobile application support for wider accessibility

▶️**How to Run the Project Locally**
# Clone the repository
git clone https://github.com/KetanWanjari/ckd-risk-prediction-ml.git

# Navigate to project directory
cd ckd-risk-prediction-ml

# Install dependencies
pip install -r requirements.txt

# Run the Flask application
python app.py


Then open:

http://localhost:5000

⚠️ Disclaimer

This system is intended only for academic and research purposes.
It should not be used as a replacement for professional medical diagnosis or treatment.

👨‍💻 Author

Ketan Wanjari
B.Tech Computer Science Engineering
Minor Project – Machine Learning
