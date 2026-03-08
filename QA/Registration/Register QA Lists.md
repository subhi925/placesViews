# 📋 Register QA Lists - Test Documentation

**Project Name:** Places Views / User Registration System  
**Tester:** Subhi Hamed  
**Role:** Practical Software Engineer & QA Specialist  
**Status:** ✅ Completed

---

## 🧪 Registration Test Cases (Manual Testing)

| ID | Test Suite | Test Title | Pre-Condition | Test Steps | Test Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC_001** | Register | Register With Valid Data | In Register page | 1. Fill Email<br>2. Fill Pass<br>3. Confirm Pass<br>4. Click Register | `test@mail.com`<br>`Test1234!` | "Registration successful!" | As expected | **PASS** |
| **TC_002** | Register | All Fields Empty | In Register page | 1. Leave all empty<br>2. Click Register | `Empty` | "All fields are required!" | As expected | **PASS** |
| **TC_003** | Register | Email Field Empty | In Register page | 1. Empty Email<br>2. Fill Pass & Confirm | `Pass12345` | "All fields are required!" | As expected | **PASS** |
| **TC_006** | Register | Illegal Email Format | In Register page | 1. Fill invalid email<br>2. Click Register | `Test12.com` | "Invalid email format" | As expected | **PASS** |
| **TC_007** | Register | Special Characters in Email | In Register page | 1. Fill Email with `+`<br>2. Click Register | `Test12+5@gmail.com` | "Registration successful!" | As expected | **PASS** |
| **TC_008** | Register | Script Injection in Email | In Register page | 1. Fill Script Email<br>2. Click Register | `Test12<script>@gmail.com` | "Registration failed. Try again." | As expected | **PASS** |
| **TC_009** | Register | Email Missing `@` | In Register page | 1. Fill no-@ email<br>2. Click Register | `Test12gmail.com` | "Invalid email format" | As expected | **PASS** |
| **TC_011** | Register | Password Too Short (2 chars) | In Register page | 1. Fill 2-char password<br>2. Click Register | `te` | "Password must be at least 8 chars..." | As expected | **PASS** |
| **TC_012** | Register | Password With No Letters | In Register page | 1. Fill numbers only<br>2. Click Register | `12345678` | "Password must contain a letter" | As expected | **PASS** |
| **TC_013** | Register | Password With No Numbers | In Register page | 1. Fill letters only<br>2. Click Register | `qwerasdf` | "Password must contain a number" | As expected | **PASS** |
| **TC_015** | Register | Passwords Mismatch | In Register page | 1. Different passwords<br>2. Click Register | `qwer1234` / `1234qwer` | "Passwords do not match" | As expected | **PASS** |
| **TC_016** | Register | Edge Case: Very Long Email | In Register page | 1. Enter long email string<br>2. Click Register | `testtest...test@ff.com` | "Registration successful!" | As expected | **PASS** |
| **TC_017** | UI/UX | Loading Animation (Lottie) | In Register page | 1. Submit valid registration<br>2. Observe UI | `valid@data.com` | Lottie animation appears before success message | As expected | **PASS** |

---

## 🐞 Bug Report (Open Issues)

| ID | Title | Description | Priority | Status |
| :--- | :--- | :--- | :--- | :--- |
| **BUG_001** | Incorrect "No Task" Message | "No available tasks" message appears incorrectly when exactly 5 tasks are added to the list. | High (A) | **Open** |

---

## 🔍 Technical Validation Notes
* **Firebase Auth:** Every successful registration was manually verified in the Firebase Console.
* **Data Sanitization:** Verified that `trim()` and `toLowerCase()` are applied to the email input.
* **Security:** Tested basic script injection protection in input fields.
