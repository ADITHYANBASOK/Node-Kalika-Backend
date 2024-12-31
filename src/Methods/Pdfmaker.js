const { PDFDocument, rgb,StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');


const pdfDirectory = path.join(__dirname, '..', 'prescriptionpdf');
if (!fs.existsSync(pdfDirectory)) {
    fs.mkdirSync(pdfDirectory, { recursive: true });
}

async function generatePrescriptionPDF(appointmentId, doctor, prescriptions, tests,duser) {

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Set up the font and text content
    const { width, height } = page.getSize();
    const fontSize = 14;
    const textWidth = page.getWidth() - 50;


    const imagePath = path.join(__dirname, '..', 'images', 'health.png');
    if (fs.existsSync(imagePath)) {
        const imageBytes = fs.readFileSync(imagePath);
        const image = await pdfDoc.embedPng(imageBytes);
        const { width: imgWidth, height: imgHeight } = image.scale(0.11); // Adjust the scale as needed

        // Position the image on the PDF (top-left corner)
        page.drawImage(image, {
            x: 40,
            y: height - imgHeight - 40, // Adjust position as needed
            width: imgWidth,
            height: imgHeight,
        });
    } else {
        console.error("Image not found:", imagePath);
    }

    // Draw text on the PDF
    // page.drawText(`Appointment ID: ${appointmentId}`, {
    //     x: 150,
    //     y: height - 50,
    //     size: fontSize,
    //     color: rgb(0, 0, 0),
    // });
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawText(`DR. ${doctor.d_firstname} ${doctor.d_lastname}`, {
        x: 110,
        y: height - 50,
        size: fontSize + 2, // Increase size by 2 units (adjust as needed)
        color: rgb(0, 0, 0),
        font: font, // Use a bold font
        // underline: true, // Add underline
    });
    const textWidth1 = font.widthOfTextAtSize(`Doctor ID: ${doctor.d_firstname}`, fontSize + 2);
const underlineY = height - 55; // Adjust as needed for underline position

// Draw underline
page.drawLine({
    start: { x: 110, y: underlineY },
    end: { x: 150 + textWidth1, y: underlineY },
    thickness: 2, // Adjust thickness as needed
    color: rgb(0, 0, 0), // Underline color (black in this example)
});
page.drawText(`${doctor.d_specialization} `, {
    x: 110,
    y: height - 70,
    size: fontSize , // Increase size by 2 units (adjust as needed)
    color: rgb(0, 0, 0),
    // font: font, // Use a bold font
    // underline: true, // Add underline
});
page.drawText(`MBBS`, {
    x: 110,
    y: height - 85,
    size: fontSize , // Increase size by 2 units (adjust as needed)
    color: rgb(0, 0, 0),
   
});
page.drawText(`ph:${doctor.d_number}`, {
    x: 110,
    y: height - 100,
    size: fontSize , // Increase size by 2 units (adjust as needed)
    color: rgb(0, 0, 0),
   
});

page.drawLine({
    start: { x: 0, y: underlineY -60 },
    end: { x: width, y: underlineY-60 },
    thickness: 20, // Adjust thickness as needed
    color: rgb(0, 0, .5), // Underline color (black in this example)
});

//patient information
page.drawText(`Patient Name: ${duser.u_firstname} ${duser.u_lastname}`, {
    x: 50,
    y:height - 150,
    size: fontSize,
    color: rgb(0, 0, 0),
});
page.drawText(`Age: 20`, {
    x: 250,
    y:height - 150,
    size: fontSize,
    color: rgb(0, 0, 0),
});
page.drawText(`Date: ${duser.u_number}`, {
    x: 350,
    y:height - 150,
    size: fontSize,
    color: rgb(0, 0, 0),
});

    // Draw prescriptions
    let y = height - 250;
const xBase = 50; // starting x position
const xIncrement = 150; // horizontal spacing between columns
for (const prescription of prescriptions) {
    const { tablet_name, dosage, times } = prescription.data;
    page.drawText(`Tablet Name: ${tablet_name}`, {
        x: xBase,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Dosage: ${dosage}`, {
        x: xBase + xIncrement,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
    });
    page.drawText(`Times: ${times}`, {
        x: xBase + 2 * xIncrement,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
    });
    y -= 20; // move to the next row
}

    // Draw tests
    y -= 20;
    for (const test of tests) {
        page.drawText(`Test: ${test}`, {
            x: 50,
            y,
            size: fontSize,
            color: rgb(0, 0, 0),
        });
        y -= 20;
    }

    // const imagePath = path.join(__dirname,'..','images', 'health.png'); // Replace with the actual path to your image
    // console.log("hai",imagePath);
    // if (fs.existsSync(imagePath)) {
    //     const imageBytes = fs.readFileSync(imagePath);
    //     console.log("haha",imageBytes);
    //     const image = await pdfDoc.embedPng(imageBytes);
    //     const { width: imgWidth, height: imgHeight } = image.scale(0.07); // Adjust the scale as needed

    //     // Position the image on the PDF
    //     page.drawImage(image, {
    //         x: 50,
    //         y: y - imgHeight - 20, // Position the image below the text
    //         width: imgWidth,
    //         height: imgHeight,
    //     });

    //     y -= imgHeight + 20; // Adjust y position for further content
    // } else {
    //     console.error("Image not found:", imagePath);
    // }
    page.drawLine({
        start: { x: 0, y: height-750 },
        end: { x: width, y: height-750},
        thickness: 4, // Adjust thickness as needed
        color: rgb(0, 0, .5), // Underline color (black in this example)
    });



console.log("hai",appointmentId)
    // Save PDF to a file
    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(pdfDirectory, `${appointmentId}.pdf`);
    fs.writeFileSync(filePath, pdfBytes);
    return filePath;
}

module.exports = { generatePrescriptionPDF };