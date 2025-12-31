const http = require("http");
const fs = require("fs");
const path = require("path");
const API_KEY = "GEMINI_API_KEY";//Gemini API Integration
const server = http.createServer(async (req,res) =>{
    if(req.method === "GET") {
        let filePath = "."+ (req.url==="/"?"/querybot.html" :req.url);
        let ext = path.extname(filePath);
        const typeMap = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "text/javascript",
        };
        try {
            const content = fs.readFileSync(filePath);
            res.writeHead(200, {"Content-Type": typeMap[ext]||"text/plain"});
            res.end(content);
        } catch {
            res.writeHead(404);
            res.end("Not found");
        }
    }
    if(req.metthod === "POST" && req.url === "/ask") {
        let body ="";
        req.on("data",chunk => body+=chunk);
        req.on("end",async () => {
            const {question} = JSON.parse(body);
            const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY},
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body:
                    JSON.stringify({
                        contents: [{
                            parts: [{
                                text:`Answer this campus-related query clearly:\n${question}`
                            }]
                        }]
                    })
                }
            );
            const data = await geminiRes.json();
            const answer = data.candidates?.
            [0]?.content?.parts?.[0]?.text|| "No response";
            res.writeHead(200,{"Content-Type": "application/json"});
            res.end(JSON.stringify({answer}));
        });
    }
});
server.listen(3000,() => {
    console.log("🚀QueryBot running at http://localhost:3000");
});