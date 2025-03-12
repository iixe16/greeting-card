import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

// استيراد الصور
import design1 from "../assets/design1.png";
import design2 from "../assets/design2.png";
import logo from "../assets/logo.png";
import backgroundImage from "../assets/backgroundImage.png";  // استيراد الصورة من assets

const Home = () => {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [userName, setUserName] = useState("");
  const cardRef = useRef(null);

  const designs = [
    { id: 1, src: design1 },
    { id: 2, src: design2 },
  ];

  const messages = [
    "تقبل الله منا ومنكم صالح الأعمال، وجعل عيدكم فرحًا وسرورًا، وكل عام وأنتم بخير",
    "كل عام وأنتم بخير، عيد فطر سعيد أعاده الله علينا وعليكم بالخير والرضا والغفران",
  ];

  const downloadCard = () => {
    if (!selectedDesign || !selectedMessage || !userName) {
      alert("يرجى اختيار التصميم والرسالة وإدخال الاسم!");
      return;
    }

    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "greeting_card.png";
      link.click();
    });
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        fontFamily: "Siwa, sans-serif",
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,  // إضافة صورة الخلفية هنا
        backgroundSize: "cover",  // لتغطية المساحة بالكامل
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",  // لتغطية كامل الشاشة
        paddingBottom: "20px",  // مسافة أسفل الصفحة لتجنب التصاق المحتوى بالحافة
        boxSizing: "border-box",
      }}
    >
      {/* إضافة الشعار في أعلى يسار الصفحة */}
      <img
        src={logo}
        alt="شعار الموقع"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "150px",  // تم زيادة الحجم هنا
          height: "auto",
          transition: "transform 0.3s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
      />

      <h1 style={{ color: "white", fontSize: "48px", fontWeight: "bold" }}>
        عيدكم مبارك
      </h1>

      <h2 style={{ color: "white", fontSize: "40px", fontWeight: "normal" }}>
        اختر تصميم البطاقة
      </h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {designs.map((design) => (
          <img
            key={design.id}
            src={design.src}
            alt={`تصميم ${design.id}`}
            style={{
              width: "450px",
              height: "450px",
              border: selectedDesign === design.id ? "4px solid blue" : "2px solid gray",
              cursor: "pointer",
              borderRadius: "10px",
              transition: "transform 0.3s",
            }}
            onClick={() => setSelectedDesign(design.id)}
          />
        ))}
      </div>

      <h2 style={{ color: "white", fontSize: "40px", fontWeight: "normal" }}>
        اختر عبارة التهنئة
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <label
            key={index}
            style={{
              display: "block",
              padding: "20px",
              background: selectedMessage === msg ? "#007bff" : "#f0f0f0",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.3s",
              width: "45%",
              height: "100px",  // جعل الارتفاع متساوي مع العرض لجعلها مربعة
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              fontSize: "35px",
              justifyContent: "center",
            }}
          >
            <input
              type="radio"
              name="message"
              value={msg}
              checked={selectedMessage === msg}
              onChange={() => setSelectedMessage(msg)}
              style={{ marginLeft: "10px", marginRight: "10px" }}
            />
            {msg}
          </label>
        ))}
      </div>

      <h2 style={{ color: "white", fontSize: "40px", fontWeight: "normal" }}>
        أدخل اسمك
      </h2>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="اكتب اسمك هنا..."
        style={{ padding: "5px", fontSize: "16px", fontFamily: "Neirizi, sans-serif" }}
      />

      <h2 style={{ color: "white", fontSize: "40px", fontWeight: "normal" }}>
        معاينة البطاقة
      </h2>
      <div
        ref={cardRef}
        style={{
          width: "400px",
          height: "500px",
          margin: "10px auto",
          position: "relative",
          backgroundImage: selectedDesign ? `url(${designs.find(d => d.id === selectedDesign)?.src})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "Siwa, sans-serif",
        }}
      >
        {/* نص التهنئة */}
        <p
          style={{
            position: "absolute",
            top: selectedDesign === 1 ? "55%" : "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#ffffff",
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
            width: "80%",
          }}
        >
          {selectedMessage || "اختر عبارة"}
        </p>

        {/* اسم المستخدم */}
        <p
          style={{
            position: "absolute",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            color: selectedDesign === 1 ? "#000000" : "#ffffff",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            background: selectedDesign === 1 ? "#F4E6D9" : "#CDA18A",
            padding: "5px 15px",
            borderRadius: "20px",
            width: "auto",
          }}
        >
          {userName ? `من: ${userName}` : "اكتب اسمك هنا"}
        </p>
      </div>

      <button
        onClick={downloadCard}
        style={{ padding: "10px 20px", fontSize: "18px", marginTop: "10px", fontFamily: "Neirizi, sans-serif" }}
      >
        تحميل البطاقة 📥
      </button>
    </div>
  );
};

export default Home;
