const fs = require('fs');

// Define os estados do autômato
const states = {
    START: 's0',
    IDENTIFIER: 's1',
    NUMBER: 's2',
    OPERATOR: 's3',
    DELIMITER: 's4',
    RESERVED: 's5',
    ERROR: 'erro'
};

let currentState = states.START;
let lexeme = ""; // Armazena o lexema atual

// Tabela de tipos de tokens
const tokenTypes = {
    IDENTIFIER: 'Identificador',
    NUMBER: 'Número',
    OPERATOR: 'Operador',
    DELIMITER: 'Delimitador',
    RESERVED: 'Palavra Reservada',
    ERROR: 'Erro'
};

// Expressões regulares para cada tipo de token
const regexPatterns = {
    identifier: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
    number: /^[0-9]+(\.[0-9]+)?$/,
    operator: /^[+\-*/=<>!&|^]+$/,
    delimiter: /^[;,(){}[\]]$/,
    reserved: /^(if|else|while|return|function|var|false|true)$/
};

// Leitura do código de entrada
const code = fs.readFileSync('inputCode.js', 'utf8');
let tokenTable = '############ TABELA DE TOKENS ############\n';

const symbolTable = new Map();

// Processa cada caractere no código de entrada
for (let i = 0; i < code.length; i++) {
    const char = code[i];

    // Ignora espaços em branco e novas linhas sem finalizar o token
    if (char === ' ' || char === '\n' || char === '\t') {
        if (lexeme && isFinalState(currentState)) {
            finalizeToken();
        }
        continue;
    }

    // Verifica se o caractere é um delimitador ou operador
    if (regexPatterns.delimiter.test(char) || regexPatterns.operator.test(char)) {
        // Finaliza o lexema atual, se houver
        if (lexeme) {
            finalizeToken();
        }

        // Processa o delimitador ou operador como um token separado
        lexeme = char;
        currentState = transition(states.START, char); // Verifica o estado para o token atual
        if (isFinalState(currentState)) {
            finalizeToken();
        } else {
            lexeme = ""; // Reinicia lexema caso o token não seja válido
        }
    } else {
        // Acumula o caractere no lexema e atualiza o estado
        currentState = transition(currentState, char);
        if (currentState !== states.ERROR) {
            lexeme += char;
        } else {
            finalizeToken(); // Finaliza o token em caso de erro
        }
    }
}

// Finaliza o último lexema se houver
if (lexeme && isFinalState(currentState)) finalizeToken();

// Função para finalizar o token atual e registrar na tabela
function finalizeToken() {
    const tokenType = determineTokenType(lexeme);
    tokenTable += `[${lexeme.trim()} -> ${tokenTypes[tokenType] || 'Desconhecido'}]\n`;

    // Adiciona identificadores e palavras reservadas à tabela de símbolos
    if (tokenType === 'IDENTIFIER' || tokenType === 'RESERVED') {
        addToSymbolTable(lexeme, tokenType);
    }

    // Reinicia o estado e o lexema
    lexeme = '';
    currentState = states.START;
}

// Função para definir as transições de estados
function transition(state, char) {
    switch (state) {
        case states.START:
            if (/[a-zA-Z_]/.test(char)) return states.IDENTIFIER;
            if (/[0-9]/.test(char)) return states.NUMBER;
            if (/[+\-*/=<>!&|^]/.test(char)) return states.OPERATOR;
            if (/[;,(){}[\]]/.test(char)) return states.DELIMITER;
            return states.ERROR;
        case states.IDENTIFIER:
            return /[a-zA-Z0-9_]/.test(char) ? states.IDENTIFIER : states.ERROR;
        case states.NUMBER:
            return /[0-9.]/.test(char) ? states.NUMBER : states.ERROR;
        case states.OPERATOR:
            return /[+\-*/=<>!&|^]/.test(char) ? states.OPERATOR : states.ERROR;
        case states.DELIMITER:
            return states.ERROR;
        default:
            return states.ERROR;
    }
}

// Verifica se um estado é final
function isFinalState(state) {
    return [states.IDENTIFIER, states.NUMBER, states.OPERATOR, states.DELIMITER, states.RESERVED].includes(state);
}

// Função para determinar o tipo do token baseado nas expressões regulares
function determineTokenType(lexeme) {
    if (regexPatterns.reserved.test(lexeme)) return 'RESERVED';
    if (regexPatterns.identifier.test(lexeme)) return 'IDENTIFIER';
    if (regexPatterns.number.test(lexeme)) return 'NUMBER';
    if (regexPatterns.operator.test(lexeme)) return 'OPERATOR';
    if (regexPatterns.delimiter.test(lexeme)) return 'DELIMITER';
    return 'ERROR';
}

// Função para adicionar identificadores à tabela de símbolos
function addToSymbolTable(name, type) {
    if (!symbolTable.has(name)) {
        symbolTable.set(name, { type, scope: 'global' });
    }
}

// Salva a tabela de tokens e a tabela de símbolos
fs.writeFileSync('./outputTable.csv', tokenTable);
let symbolTableString = '############ TABELA DE SÍMBOLOS ############\nNome; Tipo; Escopo\n';
symbolTable.forEach((value, key) => {
    symbolTableString += `${key}; ${value.type}; ${value.scope}\n`;
});
fs.writeFileSync('./symbolTable.csv', symbolTableString);

console.log('Tabelas de tokens e de símbolos criadas com sucesso!');
