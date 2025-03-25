'use strict'
class CyberSyntax {
    constructor() {
        this.languages = ['html', 'css', 'js', 'python', 'java', 'c', 'markdown', 'plaintext']
        this.colors = {
            dark: {
                keyword: '#c8f',
                number: '#fa6',
                builtin: '#f80',
                operator: '#0ff',
                function: '#7bf',
                variable: '#f88',
                string: '#0f8',
                comment: '#95a5a6',
                tag: '#cba'
            },
        
            light: {
                keyword: '#737',
                number: '#970',
                builtin: '#d35400',
                operator: '#079',
                function: '#0984e3',
                variable: '#944',
                string: '#385',
                comment: '#777',
                tag: '#432'
            }
        }

        this.theme = 'dark'
        this.format = 'inline'
    }

    customFormat(str) {return false}

    generate(code) {
        const array = []

        

        return array
    }

    modify = (type, str) => {
        const color = cyberSyntax.colors[cyberSyntax.theme][type]
        const custom = cyberSyntax.customFormat(str)
    
        if (custom) return custom
    
        if (cyberSyntax.format == 'inline')
            return '<span style="color: ' + color + '">' + str + '</span>'
    
        if (cyberSyntax.format == 'class')
            return '<span class = "' + type + '">' + str + '</span>'
    
        if (cyberSyntax.format == 'root')
            return '<span style="color: var(--' + type + ')">' + str + '</span>'
    }

    // Returns final string
    highlight(code) {
        let str = ''

        // Get array of objects
        const data = cyberSyntax.generate(code)
    
        // Loop through array and generate final code
        for (let i = 0; i < data.length; i ++) {
            const arr = data[i]
            str += cyberSyntax.modify(arr.type, arr.str)
        }
    
        return str
    }
}

const cyberSyntax = new CyberSyntax()