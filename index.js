function launchProblem() {
    const hash = window.location.hash.replace(/^#/, ''),
        fileName = (`${hash}`),
        fileUrl = `./${fileName}`;
    console.debug(fileUrl)

    if (hash == '') {
        return false;
    }

    fetch(fileUrl)
        .then(resp => {
            if (resp.status === 200)
                return resp.text()
        })
        .then(code => {
            const codeElement = document.querySelector('.code'),
                consoleElement = document.querySelector('.console'),
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
            consoleElement.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
        })
        .catch(reason => {
            console.error(reason);
        })
}

function launcheReadme() {
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

launchProblem();
window.addEventListener("hashchange", () => {
    launchProblem();
}, false);
launcheReadme();
