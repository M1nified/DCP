"use strict";
function hashNavigator() {
    const
        readme = document.querySelector('.readme'),
        problem = document.querySelector('.problem');
    function displayIndex() {
        problem.classList.add('hidden');
        readme.classList.remove('hidden');
    }
    return new Promise((resolve, reject) => {
        const hash = window.location.hash.replace(/^#/, ''),
            fileName = (`${hash}`),
            fileUrl = `./${fileName}`;

        if (hash == '') {
            displayIndex();
            resolve();
            return;
        }

        launchProblem(fileUrl)
            .then(() => {
                problem.classList.remove('hidden');
                readme.classList.add('hidden');
            })
            .catch(reason => {
                console.error(reason);
                displayIndex()
            })
    })
}

function launchProblem(fileUrl) {
    return new Promise((resolve, reject) => {
        fetch(fileUrl)
            .then(resp => {
                if (resp.status === 200)
                    return resp.text()
                return new Promise((_, reject) => { reject(resp.status) });
            })
            .then(code => {
                const codeElement = document.querySelector('.code'),
                    consoleHolder = document.querySelector('.console-holder'),
                    consoleElement = document.createElement('iframe'),
                    codeDetailsElement = document.querySelector('.code-box-header-details');
                codeElement.innerHTML = '';
                let codeHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript');
                // codeElement.appendChild(document.createTextNode(code));
                codeDetailsElement.innerHTML = `<a href="${fileUrl}">Raw</a>`;
                codeElement.innerHTML = codeHtml;
                const
                    html = `<head><style>
            body{
                font-family: monospace;
                color: #e7e7e7;
            }
            </style></head><body>
            <pre id="code"></pre>
            <script>
            let line = 1;
            const cc = Object.assign({}, console);
            console.log = function(...args){
                document.getElementById('code').appendChild(document.createTextNode((line++).toString().padStart(3, ' ') + '| ' + args.join(' ') + '\\n')); cc.log(...args);
            }
            console.info = function(...args){
                document.getElementById('code').appendChild(document.createTextNode((line++).toString().padStart(3, ' ') + '| ' + args.join(' ') + '\\n')); cc.info(...args);
            }
            </script>
            <script>${code}</script></body>`;
                consoleElement.classList.add('console');
                consoleElement.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
                consoleHolder.firstChild && consoleHolder.removeChild(consoleHolder.firstChild);
                consoleHolder.appendChild(consoleElement);
                resolve();
            })
            .catch(reason => {
                reject(reason);
            })
    })
}

function launchReadme() {
    const readmeUrl = `./README.md`;
    fetch(readmeUrl)
        .then(resp => {
            if (resp.status == 200)
                return resp.text()
        })
        .then(readmeText => {
            const
                readmeElement = document.querySelector('.readme'),
                converter = new showdown.Converter(),
                readmeHtml = converter.makeHtml(readmeText);
            readmeElement.innerHTML = readmeHtml.replace(/problems\//g, '#problems/');
        })
        .catch(reason => console.error(reason))
}

hashNavigator();
window.addEventListener("hashchange", () => {
    hashNavigator();
}, false);
launchReadme();

document.querySelectorAll('.link-home').forEach(link => {
    const goHome = event => {
        event.preventDefault();
        window.location.hash = '';
    }
    link.addEventListener('click', goHome);
})

