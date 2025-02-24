// استبدل هذا الرابط برابط API الخاص بـ Google Apps Script الذي حصلت عليه بعد النشر
const API_URL = "https://script.google.com/u/0/home/projects/1EnGfZnOesFXwuTOWm9LmAI1XLi7QluApNKSKL1ZU1JAMbJ2X49wUigNp/edit";

// إرسال البيانات إلى Google Sheets عند إرسال النموذج
document.getElementById('serviceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // الحصول على القيم المدخلة في النموذج
    let requestData = {
        machineName: document.getElementById('machine-name').value,
        issueDescription: document.getElementById('issue-description').value,
        issueEvaluation: document.getElementById('issue-evaluation').value,
        requiredParts: document.getElementById('required-parts').value,
        partPreparation: document.getElementById('part-preparation').value
    };

    // إرسال البيانات باستخدام Fetch API
    fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(data => {
        alert("تم حفظ البيانات بنجاح!");
        document.getElementById('serviceForm').reset(); // إعادة تعيين النموذج بعد الإرسال
        loadRequestsFromGoogleSheet(); // تحديث الجدول بعد الإرسال
    })
    .catch(error => console.error("Error:", error));
});

// استرجاع البيانات من Google Sheets وعرضها في الجدول
function loadRequestsFromGoogleSheet() {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        console.log("Received Data:", data);
        
        let tableBody = document.getElementById("requests-tbody");
        tableBody.innerHTML = ""; // تفريغ الجدول قبل تعبئته بالبيانات الجديدة

        for (let i = 1; i < data.length; i++) { // نبدأ من الصف الثاني لأن الأول يحتوي على العناوين
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${i}</td>
                <td>${data[i][1]}</td>
                <td>${data[i][2]}</td>
                <td>${data[i][3]}</td>
                <td>${data[i][4]}</td>
                <td>${data[i][8]}</td>
                <td>${data[i][12]}</td>
                <td>${data[i][13]}</td>
            `;
            tableBody.appendChild(row);
        }
    })
    .catch(error => console.error("Error:", error));
}

// تحميل البيانات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadRequestsFromGoogleSheet);
