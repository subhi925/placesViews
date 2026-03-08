ID Test Suite Test Title Pre-Condition Test Steps Test Data Expected Result Actual Result Status
TC_001 Register Register With Valid Email & Password In Register page 1- Fill Email
2- Fill Pass
3- Confirm Pass
4- Click Register test@mail.com, Test123! "Registration successful!" As expected PASS
TC_002 Register All Fields Empty In Register page 1- Leave all empty
2- Click Register All empty "All fields are required!" As expected PASS
TC_003 Register Email Empty In Register page 1- Empty Email
2- Fill Pass & Confirm Test12@mail.com "All fields are required!" As expected PASS
TC_006 Register Illegal Email Format In Register page 1- Fill invalid email
2- Fill Pass
3- Click Register https://www.google.com/url?sa=E&source=gmail&q=Test12.com "Invalid email format" As expected PASS
TC_007 Register Special Characters in Email In Register page 1- Fill Email with +
2- Click Register Test12+5@https://www.google.com/url?sa=E&source=gmail&q=gmail.com "Registration successful!" As expected PASS
TC_008 Register Script in Email In Register page 1- Fill Script Email
2- Click Register Test12<script>@https://www.google.com/url?sa=E&source=gmail&q=gmail.com "Registration failed. Try again." As expected PASS
TC_009 Register Email missing @ In Register page 1- Fill no-@ email
2- Click Register https://www.google.com/url?sa=E&source=gmail&q=Test12gmail.com "Invalid email format" As expected PASS
TC_011 Register Password too short (2) In Register page 1- Fill short pass
2- Click Register te "Password must be at least 8 chars..." As expected PASS
TC_012 Register Password with no letters In Register page 1- Fill numbers only
2- Click Register 12345678 "Password must contain a letter" As expected PASS
TC_013 Register Password with no numbers In Register page 1- Fill letters only
2- Click Register qwerasdf "Password must contain a number" As expected PASS
TC_015 Register Passwords Mismatch In Register page 1- Different pass/confirm
2- Click Register qwer1234 / 1234qwer "Passwords do not match" As expected PASS
TC_016 Register Very Long Email In Register page 1- Enter long email
2- Click Register testtest...test@ff.com "Registration successful!" As expected PASS
TC_017 UI/Register Loading Animation In Register page 1- Register a user
2- Watch UI test123@https://www.google.com/url?sa=E&source=gmail&q=gmail.com Animation appears before success As expected PASS
