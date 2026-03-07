📖 סיפור משתמש: הרשמת משתמש חדש (Sign-up)
כמשתמש חדש, אני רוצה להירשם לאפליקציה, כדי שאוכל ליצור פרופיל אישי ולשמור את העדפות האטרקציות שלי.

✅ קריטריונים לקבלה (Acceptance Criteria)
1. ולידציית שדות (Validation Rules)
מייל: המערכת תאפשר הרשמה רק עם כתובת מייל בפורמט תקין.
+1
סיסמה: עמידה בחוקי המערכת: לפחות 8 תווים, לפחות אות אחת (A-Z/a-z) ולפחות מספר אחד (0-9).
+2
אימות סיסמה: השדה חייב להיות זהה לשדה הסיסמה המקורי.
2. חווית משתמש ועיצוב (UI/UX)
לחצן הרשמה: הלחצן יהיה בצבע כחול, עליו הכיתוב "REGISTER", והוא ימוקם מתחת לשדות הקלט.
מצב טעינה (Loading): בזמן שליחת הנתונים ל-Firebase, הלחצן ייעלם ותופיע אנימציית המתנה (Lottie) כדי למנוע לחיצות כפולות.
3. טיפול בשגיאות (Error Handling)
משתמש קיים: במידה והמייל כבר רשום במערכת, תוצג הודעה: "Email is already registered. Go to Login page".
+1
סיסמה לא תקינה: תוצג הודעה מפורטת לגבי חוקי הסיסמה במידה והמשתמש חרג מהם.
מייל לא תקין: תוצג הודעת שגיאה על פורמט מייל שגוי.
4. הצלחה (Success State)
בסיום תהליך תקין, המערכת תציג הודעת הצלחה "Registration successful!".




User Story: User Registration (Sign-up)
As a new user,
I want to create an account by providing my email and a secure password,
So that I can access the application's features and save my preferences.

Acceptance Criteria (Technical Specifications)
1. Input Validation Rules
Email: Must follow a valid format (e.g., user@example.com).
Password Complexity:
Minimum length: 8 characters.
Must contain at least one letter (A-Z, a-z).
Must contain at least one number (0-9).
Password Confirmation: The "Confirm Password" field must be identical to the "Password" field.
2. UI/UX Requirements
Submit Button:
Label: "REGISTER" (Uppercase).
Color: Blue (bg-blue-500).
Position: Located at the bottom of the registration form.
Loading State:
While the system processes the request, the Register button must be hidden.
A loading animation (Lottie) must be displayed during the process to prevent duplicate submissions.
3. Error Handling & Feedback
Existing User: If the email is already registered in Firebase, display: "Email is already registered. Go to Login page".
Validation Failure: If inputs do not meet the requirements, display a specific error message in red.
Success State: Upon successful registration, display: "Registration successful!".
4. Data Integrity
All inputs must be trimmed (removing leading/trailing whitespaces) before being sent to the database.

