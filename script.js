const toast = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');

const paragraphCountSelect = document.getElementById('paragraph-count');
const generateBtn = document.getElementById('generate-btn');
const outputTextarea = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');
const charCountDisplay = document.getElementById('char-count');

const emailBtn = document.getElementById('email-btn');
const emailOutput = document.getElementById('email-output');
const emailCopyBtn = document.getElementById('email-copy-btn');

const passwordLengthSelect = document.getElementById('password-length');
const passwordComplexitySelect = document.getElementById('password-complexity');
const passwordBtn = document.getElementById('password-btn');
const passwordOutput = document.getElementById('password-output');
const passwordCopyBtn = document.getElementById('password-copy-btn');

generateBtn.addEventListener('click', generateLoremIpsum);
copyBtn.addEventListener('click', () => copyToClipboard(outputTextarea, copyBtn));
emailBtn.addEventListener('click', generateEmails);
emailCopyBtn.addEventListener('click', () => copyToClipboard(emailOutput, emailCopyBtn));
passwordBtn.addEventListener('click', generatePasswords);
passwordCopyBtn.addEventListener('click', () => copyToClipboard(passwordOutput, passwordCopyBtn));

themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.documentElement.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    }
}

loadTheme();

const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    "Nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
    "Qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
    "Facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum.",
    "Rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium."
];

function generateLoremIpsum() {
    const count = parseInt(paragraphCountSelect.value);
    const selected = paragraphs.slice(0, count);
    outputTextarea.value = selected.join('\n\n');
    updateCharCount(outputTextarea, charCountDisplay);
    copyBtn.disabled = false;
}

function updateCharCount(textarea, display) {
    const charCount = textarea.value.length;
    display.textContent = charCount + ' ' + (charCount === 1 ? 'carácter' : 'caracteres');
}

function copyToClipboard(textarea, button) {
    textarea.select();
    document.execCommand('copy');

    button.classList.add('copied');
    button.textContent = '✓ Copiado';

    showToast('¡Copiado al portapapeles!');

    setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = '<span class="copy-icon">📋</span><span class="copy-text">Copiar</span>';
    }, 2000);
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

const emailFirstNames = ['john', 'jane', 'alex', 'michael', 'sarah', 'david', 'emma', 'james', 'olivia', 'chris', 'maria', 'robert', 'lisa', 'antonio', 'sofia'];
const emailLastNames = ['smith', 'johnson', 'brown', 'jones', 'garcia', 'miller', 'davis', 'wilson', 'anderson', 'taylor', 'thomas', 'rodriguez', 'martinez', 'hernandez', 'lopez'];
const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'test.com', 'example.com', 'mail.com', 'domain.com', 'email.com', 'data.com'];

function generateEmails() {
    const firstName = emailFirstNames[Math.floor(Math.random() * emailFirstNames.length)];
    const lastName = emailLastNames[Math.floor(Math.random() * emailLastNames.length)];
    const randomNum = Math.floor(Math.random() * 9999);
    const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const email = `${firstName}.${lastName}${randomNum}@${domain}`;
    emailOutput.value = email;
    updateCharCount(emailOutput, emailCopyBtn.parentElement.querySelector('.char-count'));
    emailCopyBtn.disabled = false;
}

const passwordCharsets = {
    low: 'abcdefghijklmnopqrstuvwxyz0123456789',
    medium: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    high: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
};

function generatePasswords() {
    const length = parseInt(passwordLengthSelect.value);
    const complexity = passwordComplexitySelect.value;
    const charset = passwordCharsets[complexity];
    let password = '';
    for (let j = 0; j < length; j++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    passwordOutput.value = password;
    updateCharCount(passwordOutput, passwordCopyBtn.parentElement.querySelector('.char-count'));
    passwordCopyBtn.disabled = false;
}
