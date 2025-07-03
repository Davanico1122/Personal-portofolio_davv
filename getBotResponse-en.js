// File: getBotResponse-en.js

function getBotResponseEN(input) {
const m = input.toLowerCase();
const now = new Date();

  // === Waktu, Hari, Tanggal ===
  if (m.includes("time")) {
    const h = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    return `The current time is ${h}:${min}.`;
  }

  if (m.includes("day")) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `Today is ${days[now.getDay()]}.`;
  }

  if (m.includes("date")) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `Today's date is ${now.toLocaleDateString('en-US', options)}.`;
  }


// === GREETINGS ===
if (m.includes("hello") || m.includes("hi")) return "Hello! Welcome to Davanico's portfolio! Feel free to ask anything about the projects 😊";
if (m.includes("good morning")) return "Good morning! Hope you're ready to explore some amazing designs 🌞";
if (m.includes("good afternoon")) return "Good afternoon! Perfect time to discover creative design projects!";
if (m.includes("good evening")) return "Good evening! Enjoy browsing through this portfolio 🌇";
if (m.includes("good night")) return "Good night! I'm always here if you want to explore later 😴";
if (m.includes("how are you") || m.includes("how do you do")) return "I'm great! Always ready to showcase awesome design works. How about you?";
if (m.includes("what are you doing")) return "I'm getting ready to guide you through Davanico’s portfolio. Ask me anything!";

  
// === INTRODUCTION ===
if (m.includes("your name")) return "You can call me Assistant Bot 😊";
if (m.includes("who are you") || m.includes("what are you")) return "I'm a chatbot created to help you explore Davanico's design portfolio!";
if (m.includes("age") || m.includes("how old")) return "I'm newly created to assist with this website. I'm fresh and ready!";
if (m.includes("where are you from")) return "I live in the cloud, very close to Davanico's portfolio server!";
if (m.includes("hobby") || m.includes("hobbies")) return "I love talking about design, creativity, and playing some cool games!";

// === ABOUT DAVANICO ===
if (m.includes("davanico") || m.includes("owner") || m.includes("creator")) return "Davanico is a DKV student passionate about graphic design, branding, and creative visuals.";
if (m.includes("who is davanico")) return "Davanico is a talented designer focused on logos, posters, illustrations, and branding projects!";
if (m.includes("college") || m.includes("university") || m.includes("campus")) return "Davanico studies Visual Communication Design (DKV) — perfect for a creative journey!";
if (m.includes("major") || m.includes("study")) return "His major is Visual Communication Design (DKV), where creativity meets strategy.";
if (m.includes("student")) return "Yes, Davanico is a design student with professional-level work 🎓";

// === DESIGN & SKILLS ===
if (m.includes("design")) return "Davanico specializes in graphic design, especially branding and visual identity. Every design has a meaning!";
if (m.includes("skill") || m.includes("can do") || m.includes("abilities")) return "Logo design, branding, posters, illustration, and even making mini-games!";
if (m.includes("logo")) return "Logos by Davanico are meaningful, clean, and impactful. Every logo tells a story!";
if (m.includes("poster")) return "Posters designed by Davanico are vibrant, engaging, and creative!";
if (m.includes("branding")) return "Branding is Davanico’s passion. From concept to execution, all designs are thoughtful and cohesive.";
if (m.includes("visual identity")) return "His visual identities are consistent, modern, and unique!";
if (m.includes("illustration")) return "Illustrations by Davanico include character design, digital art, and versatile styles.";
if (m.includes("portfolio")) return "This portfolio showcases Davanico's work across branding, design, illustration, and more!";
if (m.includes("project") || m.includes("work")) return "Check out various projects by Davanico — logos, posters, games, and creative designs.";

// === TOOLS & SOFTWARE ===
if (m.includes("tools") || m.includes("software")) return "Davanico uses Adobe Suite (Photoshop, Illustrator, InDesign), Figma, and more.";
if (m.includes("photoshop")) return "Photoshop is used for photo manipulation and digital art.";
if (m.includes("illustrator")) return "Illustrator is perfect for vector logos and design elements.";
if (m.includes("figma")) return "Figma is often used for UI/UX design and collaboration.";
if (m.includes("canva")) return "Canva is used sometimes, but Davanico prefers professional tools.";

// === GAMES ===
if (m.includes("game") || m.includes("play")) return "Yes! You can play 3 games here: Rubik Game, Memory Card Flip, and Spacewar!";
if (m.includes("rubik")) return "Rubik Game tests your logic and problem-solving skills!";
if (m.includes("memory")) return "Memory Card Flip is a great game to challenge your memory!";
if (m.includes("spacewar") || m.includes("space war")) return "Spacewar is a fun arcade-style game. Ready to blast off!";
if (m.includes("how to play")) return "Just scroll down to the contact section and click the game you want to play! 🎮";

// === CONTACT & INFO ===
if (m.includes("contact")) return "Scroll down to the contact section to reach out to Davanico 📞";
if (m.includes("email")) return "Email: davanico1122@gmail.com 📧";
if (m.includes("whatsapp") || m.includes("wa")) return "WhatsApp: 08978143546. Feel free to chat!";
if (m.includes("instagram")) return "Follow @davanico on Instagram for latest works and updates!";
if (m.includes("social media")) return "Davanico is active on Instagram, Behance, and more. Check contact section for links.";

// === SERVICES & CLIENTS ===
if (m.includes("services") || m.includes("freelance")) return "Davanico offers freelance services for logos, branding, posters, and more!";
if (m.includes("price") || m.includes("cost") || m.includes("rate")) return "For pricing, it's best to contact Davanico directly. Each project is unique.";
if (m.includes("collab") || m.includes("collaboration")) return "Open to collaboration, especially creative challenges. Let's work together!";
if (m.includes("clients")) return "Davanico has worked with various clients. Check the portfolio for examples!";
if (m.includes("testimonials") || m.includes("reviews")) return "Client reviews are included in some project case studies.";

// === WORKFLOW ===
if (m.includes("process") || m.includes("workflow")) return "Design process includes research, sketching, execution, and delivery. Thorough and detailed!";
if (m.includes("revision")) return "Revisions are always welcome! Good feedback leads to great work!";
if (m.includes("deadline")) return "Deadlines are set based on project needs. Davanico is committed to timely delivery.";
if (m.includes("concept")) return "Every design starts with a solid concept. No random visuals — everything is intentional!";

// === INSPIRATION & STYLE ===
if (m.includes("inspiration")) return "Inspiration comes from nature, pop culture, minimalism, and urban life.";
if (m.includes("style")) return "Clean, modern, bold — but adaptable depending on the brand.";
if (m.includes("trend")) return "Trendy, but always with a timeless touch!";
if (m.includes("creative")) return "Creativity is at the core of every project by Davanico.";

// === WEBSITE & TECH ===
if (m.includes("website")) return "This portfolio website showcases all of Davanico’s work — plus fun games!";
if (m.includes("coding") || m.includes("programming")) return "Davanico also codes! HTML, CSS, JavaScript — creative and technical!";
if (m.includes("html") || m.includes("css") || m.includes("javascript")) return "The site is built with clean HTML, CSS, and JavaScript.";
if (m.includes("responsive")) return "The website is fully responsive — great on mobile, tablet, or desktop!";

// === GENERAL RESPONSES ===
if (m.includes("thank you") || m.includes("thanks")) return "You're welcome! Have fun exploring the portfolio 🙌";
if (m.includes("great") || m.includes("awesome") || m.includes("cool")) return "Thanks! Davanico appreciates your kind words!";
if (m.includes("wow") || m.includes("amazing") || m.includes("incredible")) return "Right?! There’s more to discover — keep scrolling!";
if (m.includes("like") || m.includes("love")) return "Glad you like it! Your support means a lot 💖";

// === HELP & NAVIGATION ===
if (m.includes("help")) return "I’m here to help! Ask anything about the portfolio, contact, or games.";
if (m.includes("how")) return "Could you clarify? I’d love to give a more specific answer.";
if (m.includes("where")) return "Let me know what you're looking for — I’ll help you find it!";
if (m.includes("scroll")) return "Scroll down to discover more projects and try out the games at the bottom!";

// === GOODBYES ===
if (m.includes("bye") || m.includes("goodbye") || m.includes("see you")) return "Goodbye! Thanks for visiting Davanico’s portfolio. Come back soon! 👋";
if (m.includes("done") || m.includes("finish")) return "Alright! Let me know if you need anything else. Enjoy browsing!";

return "That's an interesting question! I'm still learning to answer that. Try rephrasing it? 😊";
}
