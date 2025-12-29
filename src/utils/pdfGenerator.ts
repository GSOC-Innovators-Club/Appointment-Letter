import { FireMember } from '../firebase';

export const generateLetterHTML = (
  member: FireMember,
  vitLogoSrc?: string,
  gsocLogoSrc?: string,
  facultySignSrc?: string,
  presidentSignSrc?: string,
  vicePresidentSignSrc?: string
): string => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Normalized fields (support both Firestore and legacy shapes)
  const name = (member as any).name || (member as any).fullName || '';
  const regNo = (member as any).reg_no ?? (member as any).regNo ?? (member as any).reg ?? '';
  const teamName = (member as any).team_name ?? (member as any).team ?? (member as any).teamName ?? '';

  const vitSrc = vitLogoSrc || '/Logos/VITB_logo.png';
  const gsocSrc = gsocLogoSrc || '/Logos/GSOC%20Innovators%20Club%20Website.png';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Letter - ${name}</title>
    <style>
        /* Using Times New Roman for a classic, print-friendly look */

        body {
            font-family: 'Times New Roman', Times, serif;
            margin: 0;
            padding: 0;
            background-color: #f0f2f5;
            position: relative;
            min-height: 100vh;
        }

        .container {
            width: 8.5in;
            height: 11in;
            margin: 0 auto;
            background: #fff;
            padding: 1in;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            position: relative;
            z-index: 2;
        }
        
        .logo-placeholder {
            height: 80px;
            width: 150px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 14px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        }
        
        .logo-gsoc {
            background: linear-gradient(135deg, #28a745, #20c997);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }
        
        .title {
            font-size: 28px;
            font-weight: 700;
            color: #2c3e50;
            text-align: center;
            margin: 30px 0;
            text-transform: uppercase;
            letter-spacing: 3px;
            position: relative;
            z-index: 2;
        }

        .title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, #007bff, #28a745);
            border-radius: 2px;
        }

        .date {
            font-size: 14px;
            margin-bottom: 6px; /* reduced spacing */
            position: relative;
            z-index: 2;
        }
        
        .dear {
            margin-bottom: 4px; /* smaller gap to registration line */
            font-weight: 700;
            text-transform: uppercase;
            color: #2c3e50;
        }

        .content {
            font-size: 13px;
            line-height: 1.8;
            color: #34495e;
            text-align: justify;
            position: relative;
            z-index: 2;
            flex: 1;
        }
        
        .content p {
            margin-bottom: 16px;
        }
        
        .content p:first-child {
            font-size: 16px;
            font-weight: 600;
            color: #007bff;
            text-align: center;
            margin-bottom: 25px;
            background: linear-gradient(135deg, #e3f2fd, #f0f8ff);
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        
        .content b {
            font-weight: 700;
            color: #2c3e50;
        }

        .signatures {
            margin-top: auto;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-top: 50px;
            position: relative;
            z-index: 2;
        }

        .signature-block {
            text-align: center;
            font-size: 12px;
            position: relative;
        }
        
        .signature-line {
            width: 200px;
            height: 1px;
            background: #34495e;
            margin: 40px auto 10px auto;
        }
        
        .signature-title {
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .signature-subtitle {
            font-size: 10px;
            color: #7f8c8d;
            font-style: italic;
        }
        
        .background-wave {
            position: absolute;
            bottom: -50px;
            left: 0;
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            clip-path: polygon(0 80%, 100% 50%, 100% 100%, 0 100%);
            opacity: 0.1;
            z-index: 1;
        }
        
        .decorative-circle {
            position: absolute;
            top: 100px;
            right: -30px;
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #28a745, #20c997);
            border-radius: 50%;
            opacity: 0.05;
            z-index: 1;
        }
        
        .decorative-circle2 {
            position: absolute;
            bottom: 250px;
            left: -40px;
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #ffc107, #fd7e14);
            border-radius: 50%;
            opacity: 0.05;
            z-index: 1;
        }
        
        @media print {
            body {
                background-color: white;
            }
            .container {
                box-shadow: none;
                margin: 0;
                padding: 0.8in;
            }
        }
        /* Responsive tweaks for viewing the generated HTML on mobile devices before printing */
        @media (max-width: 600px) {
            .container {
                padding: 0.6in;
                width: auto;
            }
            .title { font-size: 18px; }
            .content { font-size: 12px; }
            .signature-line { width: 120px; }
        }
    </style>
</head>
<body>

<div class="container">
    <!-- Background decorations -->
    <div class="background-wave"></div>
    <div class="decorative-circle"></div>
    <div class="decorative-circle2"></div>

    <div class="header">
        <!-- Real logos -->
        <div style="height: 80px; width: 150px; display: flex; align-items: center; justify-content: center;">
            <img src="${vitSrc}" 
                 alt="VIT Bhopal Logo" 
                 style="height: 70px; width: auto; object-fit: contain;" />
        </div>
        <div style="height: 80px; width: 150px; display: flex; align-items: center; justify-content: center;">
            <img src="${gsocSrc}" 
                 alt="GSoC Innovators Club Logo" 
                 style="height: 70px; width: auto; object-fit: contain;" />
        </div>
    </div>

    <h1 class="title">Letter of Appointment</h1>

    <p class="date">${currentDate}</p>
    <p class="dear">Dear ${name.toUpperCase()},</p>
    <p class="dear">Registration No: ${regNo}</p>

    <div class="content">
        <p>Welcome to the GSoC Innovators Family!</p>
        <p>We are absolutely thrilled to have you join our prestigious GSoC Innovators Club community. You have been selected as a <b>Core Member</b> of the <b>${teamName}</b> team for the 2025-26 academic tenure. After reviewing your application and considering your skills, enthusiasm, and passion for innovation, we are confident that your contributions will play a key role in driving our club's vision forward.</p>
        <p>Your unique perspective and expertise will be invaluable to our team, and we're excited for your involvement in brainstorming innovative project ideas, working on cutting-edge open-source solutions, and contributing to the growth of the GSoC innovators family. As a core member, your role will require dedication, collaboration, and a strong commitment to the values and mission of our club.</p>
        <p>This appointment comes with exciting opportunities to work on real-world projects, participate in Google Summer of Code preparations, attend exclusive workshops and seminars, and build lasting connections with industry professionals and fellow innovators. We are certain you will be an invaluable asset to our team and can't wait to see the impact your innovative ideas will have on our initiatives.</p>
        <p><b>Congratulations on being selected, and welcome to the team! We look forward to an exciting and enriching journey of growth, learning, and innovation ahead with you.</b></p>
    </div>

    <div class="signatures">
        <div class="signature-block" style="text-align:center;">
            ${facultySignSrc ? `<img src="${facultySignSrc}" alt="Faculty Signature" style="height:70px; display:block; margin:0 auto 8px; object-fit:contain;" onerror="this.style.display='none'" />` : ''}
            <div class="signature-line" style="margin: 0 auto 10px auto; width:160px;"></div>
            <div class="signature-title">Faculty Coordinator</div>
            <div class="signature-subtitle">GSoC Innovators Club</div>
        </div>
        <div class="signature-block" style="text-align:center;">
            ${presidentSignSrc ? `<img src="${presidentSignSrc}" alt="President Signature" style="height:70px; display:block; margin:0 auto 8px; object-fit:contain;" onerror="this.style.display='none'" />` : ''}
            <div class="signature-line" style="margin: 0 auto 10px auto; width:160px;"></div>
            <div class="signature-title">President</div>
            <div class="signature-subtitle">GSoC Innovators Club</div>
        </div>
        <div class="signature-block" style="text-align:center;">
            ${vicePresidentSignSrc ? `<img src="${vicePresidentSignSrc}" alt="Vice President Signature" style="height:70px; display:block; margin:0 auto 8px; object-fit:contain;" onerror="this.style.display='none'" />` : ''}
            <div class="signature-line" style="margin: 0 auto 10px auto; width:160px;"></div>
            <div class="signature-title">Vice President</div>
            <div class="signature-subtitle">GSoC Innovators Club</div>
        </div>
    </div>

</div>

</body>
</html>
  `;
};

const fetchAsDataURL = async (url: string, fallback?: string): Promise<string> => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    // fallback to provided URL (could be remote or original path)
    return fallback || url;
  }
};

export const downloadPDF = async (member: FireMember): Promise<void> => {
  // Try to inline local public images as data URIs so they are always available in the printed PDF
  const vitPath = '/Logos/VITB_logo.png';
  const gsocPath = '/Logos/GSOC%20Innovators%20Club%20Website.png';
  const vitFallback = '/VITB%20logo.png';
  const gsocFallback = '/GSOC%20Innovators%20Club%20Website.png';

  const [vitDataUrl, gsocDataUrl, facultySignDataUrl, presidentSignDataUrl, vicePresidentSignDataUrl] = await Promise.all([
    fetchAsDataURL(vitPath, vitFallback),
    fetchAsDataURL(gsocPath, gsocFallback),
    // signatures are optional; fallback to empty string if missing so generateLetterHTML can omit them
    fetchAsDataURL('/Signs/Javed_Sir_Sign.jpg', ''),
    fetchAsDataURL('/Signs/Aarushi_Sign.jpg', ''),
    fetchAsDataURL('/Signs/Ashish_Sign.jpg', '')
  ]);

  const html = generateLetterHTML(member, vitDataUrl, gsocDataUrl, facultySignDataUrl, presidentSignDataUrl, vicePresidentSignDataUrl);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to generate PDF');
    return;
  }

  printWindow.document.write(html);
  printWindow.document.close();
  
  // Wait for fonts and styles and images to load
  printWindow.onload = () => {
    // Give images a bit more time to load, then print
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 1400);
  };
};