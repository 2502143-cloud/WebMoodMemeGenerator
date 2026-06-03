USE MoodMemeDB;

-- Delete old broken memes
DELETE FROM Memes;

-- Insert fresh ones with working URLs
INSERT INTO Memes (Title, ImageUrl, Mood, Tags, LikeCount, CreatedAt) VALUES
('Friday Feeling!', 'https://i.imgflip.com/1bij.jpg', 'happy', 'friday,weekend,excited', 0, GETUTCDATE()),
('Code Works First Try', 'https://i.imgflip.com/26am.jpg', 'happy', 'coding,success,programmer', 0, GETUTCDATE()),
('Payday Arrived!', 'https://i.imgflip.com/1tg14.jpg', 'happy', 'money,payday,celebration', 0, GETUTCDATE()),
('Weekend Is Here', 'https://i.imgflip.com/4t0m5.jpg', 'happy', 'weekend,happy,excited', 0, GETUTCDATE()),
('Pizza Just Arrived', 'https://i.imgflip.com/1otk96.jpg', 'happy', 'food,pizza,happy', 0, GETUTCDATE()),
('Monday Morning Vibes', 'https://i.imgflip.com/1c1uej.jpg', 'sad', 'monday,work,tired', 0, GETUTCDATE()),
('Waiting For Text Back', 'https://i.imgflip.com/3si4.jpg', 'sad', 'waiting,text,lonely', 0, GETUTCDATE()),
('Out Of Coffee', 'https://i.imgflip.com/2hgfw.jpg', 'sad', 'coffee,morning,sad', 0, GETUTCDATE()),
('Budget After Bills', 'https://i.imgflip.com/1ur9b0.jpg', 'sad', 'money,broke,bills', 0, GETUTCDATE()),
('Rain On Day Off', 'https://i.imgflip.com/1khwre.jpg', 'sad', 'rain,unlucky,sad', 0, GETUTCDATE()),
('Code Breaks After One Change', 'https://i.imgflip.com/1yxkcp.jpg', 'frustrated', 'coding,bug,frustrated', 0, GETUTCDATE()),
('Slow Internet On Deadline', 'https://i.imgflip.com/9vct.jpg', 'frustrated', 'internet,slow,deadline', 0, GETUTCDATE()),
('Traffic On Friday', 'https://i.imgflip.com/1bhk.jpg', 'frustrated', 'traffic,driving,late', 0, GETUTCDATE()),
('Meetings That Could Be Emails', 'https://i.imgflip.com/3uewkg.jpg', 'frustrated', 'meetings,work,email', 0, GETUTCDATE()),
('Printer Needs Ink Again', 'https://i.imgflip.com/2wifvo.jpg', 'frustrated', 'printer,office,annoyed', 0, GETUTCDATE());