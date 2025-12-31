async function askBot() {
    const question = document.getElementById("question").ariaValueMax;
    document.getElementById("answer").innerText = "Thinking...🤔";
    const res = await fetch("/ask", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:
        JSON.stringify({question})
    });
    const data = await res.json();
    document.getElementById("answer").innerText=data.answer;
}
