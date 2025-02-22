<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إنشاء ملف DOCX</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pizzip/3.0.3/pizzip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.3.5/docxtemplater.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
</head>
<body>

    <h2>إدخال بيانات الصيانة</h2>
    <form id="serviceForm">
        <label for="machine-name">اسم الماكينة:</label><br>
        <input type="text" id="machine-name" name="machine-name" required><br><br>

        <label for="issue-description">وصف العطل:</label><br>
        <textarea id="issue-description" name="issue-description" required></textarea><br><br>

        <label for="issue-evaluation">تقييم العطل:</label><br>
        <textarea id="issue-evaluation" name="issue-evaluation" required></textarea><br><br>

        <label for="required-parts">القطع المطلوبة:</label><br>
        <textarea id="required-parts" name="required-parts" required></textarea><br><br>

        <label for="part-preparation">القطع الجاهزة:</label><br>
        <textarea id="part-preparation" name="part-preparation" required></textarea><br><br>

        <button type="submit">إنشاء ملف DOCX</button>
    </form>

    <script>
        document.getElementById('serviceForm').addEventListener('submit', function(e) {
            e.preventDefault();

            // الحصول على البيانات المدخلة من النماذج
            var machineName = document.getElementById('machine-name').value;
            var issueDescription = document.getElementById('issue-description').value;
            var issueEvaluation = document.getElementById('issue-evaluation').value;
            var requiredParts = document.getElementById('required-parts').value;
            var partPreparation = document.getElementById('part-preparation').value;

            // بيانات القالب
            var docData = {
                machineName: machineName,
                issueDescription: issueDescription,
                issueEvaluation: issueEvaluation,
                requiredParts: requiredParts,
                partPreparation: partPreparation
            };

            // تحميل القالب DOCX
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'template.docx', true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function() {
                var arrayBuffer = xhr.response;
                var zip = new PizZip(arrayBuffer);
                var doc = new docxtemplater(zip);

                // إدخال البيانات في القالب
                doc.setData(docData);

                try {
                    // بناء الملف
                    doc.render();

                    // حفظ الملف الناتج
                    var out = doc.getZip().generate({type: "blob"});
                    saveAs(out, "طلب_الصيانة.docx");
                } catch (error) {
                    console.error(error);
                }
            };

            xhr.send();
        });
    </script>

</body>
</html>
