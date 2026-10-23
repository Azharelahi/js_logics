
function make(tag, text, parent) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (parent) parent.appendChild(node);
    return node;
}

function section(title) {
    const box = make("div", "", document.body);
    box.style.border = "1px solid #ccc";
    box.style.padding = "12px";
    box.style.margin = "12px 0";
    box.style.maxWidth = "420px";
    make("h3", title, box);
    return box;
}

function field(box, label, placeholder) {
    const row = make("p", label + " ", box);
    const input = make("input", "", row);
    if (placeholder) input.placeholder = placeholder;
    return input;
}

function output(box) {
    const out = make("p", "", box);
    out.style.fontWeight = "bold";
    return out;
}

function button(box, label, onClick) {
    const btn = make("button", label, box);
    btn.onclick = onClick;
    return btn;
}

function isEmpty(value) {
    return value.trim() === "";
}

function ageToDays(age) {
    return age * 365;
}

function calculateBMI(weight, height) {
    return weight / (height * height);
}

function capitalise(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function hoursToSeconds(hours) {
    return hours * 3600;
}

function nextInArray(arr, num) {
    const bigger = arr.filter(x => x > num);
    return bigger.length ? Math.min(...bigger) : "No bigger number found";
}

function nextNumber(n) {
    return Number.isInteger(n) ? n + 1 : Math.ceil(n);
}

function randomArray() {
    const arr = [];
    const size = Math.floor(Math.random() * 8) + 3;
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

function firstAndLast(arr) {
    return [arr[0], arr[arr.length + 0 - 1]];
}

// ---------- page ----------
document.body.style.fontFamily = "sans serif";
make("h1", "JS Tasks", document.body);

// 1. Add two numbers
(function () {
    const box = section("1. Add Two Numbers");
    const a = field(box, "First number");
    const b = field(box, "Second number");
    const out = output(box);

    function run() {
        const x = parseFloat(a.value);
        const y = parseFloat(b.value);
        out.textContent = "Result: " + (x + y);
    }
    a.oninput = run;
    b.oninput = run;
})();

// 2. Age to days
(function () {
    const box = section("2. Age to Days");
    const age = field(box, "Age in years");
    const out = output(box);

    age.oninput = function () {
        if (isEmpty(age.value)) { out.textContent = ""; return; }
        const v = parseFloat(age.value);
        out.textContent = isNaN(v) ? "Enter a valid age" : v + " years = " + ageToDays(v) + " days";
    };
})();

// 3. BMI calculator
(function () {
    const box = section("3. BMI Calculator");
    const w = field(box, "Weight in kg");
    const h = field(box, "Height in metres");
    const out = output(box);

    function run() {
        if (isEmpty(w.value) || isEmpty(h.value)) { out.textContent = ""; return; }
        const weight = parseFloat(w.value);
        const height = parseFloat(h.value);
        if (isNaN(weight) || isNaN(height) || height <= 0) {
            out.textContent = "Enter valid values";
            return;
        }
        out.textContent = "Your BMI is " + calculateBMI(weight, height).toFixed(1);
    }
    w.oninput = run;
    h.oninput = run;
})();

// 4. Capitalise name
(function () {
    const box = section("4. Capitalise Name");
    const name = field(box, "Name in lowercase");
    const out = output(box);

    name.oninput = function () {
        const v = name.value;
        if (isEmpty(v)) { out.textContent = ""; return; }
        out.textContent = v !== v.toLowerCase() ? "Please use lowercase only" : capitalise(v);
    };
})();

// 5. Hours to seconds
(function () {
    const box = section("5. Hours to Seconds");
    const hrs = field(box, "Hours");
    const out = output(box);

    hrs.oninput = function () {
        if (isEmpty(hrs.value)) { out.textContent = ""; return; }
        const v = parseFloat(hrs.value);
        out.textContent = isNaN(v) ? "Enter valid hours" : v + " hours = " + hoursToSeconds(v) + " seconds";
    };
})();

// 6. Next number
(function () {
    const box = section("6. Next Number");

    make("h4", "Scenario 1: array", box);
    const arrInput = field(box, "Array", "4, 9, 15, 22, 31");
    const numInput = field(box, "Number", "15");
    const out1 = output(box);

    function run1() {
        if (isEmpty(arrInput.value) || isEmpty(numInput.value)) { out1.textContent = ""; return; }
        const arr = arrInput.value.split(",").map(s => Number(s.trim()));
        const num = Number(numInput.value);
        if (arr.some(isNaN) || isNaN(num)) {
            out1.textContent = "Enter valid numbers";
            return;
        }
        out1.textContent = "Next number: " + nextInArray(arr, num);
    }
    arrInput.oninput = run1;
    numInput.oninput = run1;

    make("h4", "Scenario 2: single value", box);
    const single = field(box, "Number (integer or float)");
    const out2 = output(box);

    single.oninput = function () {
        if (isEmpty(single.value)) { out2.textContent = ""; return; }
        const n = Number(single.value);
        out2.textContent = isNaN(n) ? "Enter a valid number" : "Next number: " + nextNumber(n);
    };
})();

// 7. First and last element of a random array
(function () {
    const box = section("7. Random Array");
    const out = output(box);

    button(box, "Generate", function () {
        const arr = randomArray();
        const res = firstAndLast(arr);
        out.textContent = "Array: " + arr.join(", ") + " | First: " + res[0] + " | Last: " + res[1];
    });
})();