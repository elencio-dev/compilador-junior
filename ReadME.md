## Compilador

// reconhecer próximo token
estado = s0
lexema = “”
pilha.limpa()
while (!eof && estado ≠ erro) do
char = leChar()
lexema = lexema + char
push (estado)
estado = trans(estado,char)
end;

// limpar estado final

while (estado ∉ SF && !pilha.vazia()) do
estado ← pilha.pop()
lexema = lexema.truncaUltimo()
voltaChar()
end;
if (estado ∈ SF)
// rótulo do estado é tipo do token
then return <estado.rotulo,lexema>
else return erro

//construir um NFA para cada regra, o estado final desse NFA é
rotulado com o tipo do token


Aqui está uma **to-do list** baseada nas etapas principais para programar um compilador. Organizei em uma sequência prática para guiar o processo.

### To-Do List para Programar um Compilador

#### 1. **Planejamento e Preparação**
   - [ ] Escolher a linguagem de origem (ex.: uma linguagem própria, C-like, ou uma existente).
   - [ ] Definir a linguagem de destino (linguagem de máquina, bytecode, ou linguagem intermediária).
   - [ ] Especificar a gramática da linguagem de origem (usar notação BNF ou EBNF).
   - [ ] Definir quais ferramentas serão usadas para o lexer, parser e geração de código (ex.: Flex, Bison, LLVM).

#### 2. **Análise Léxica (Lexer)**
   - [ ] Implementar o analisador léxico para identificar tokens (palavras-chave, identificadores, operadores, literais).
   - [ ] Escrever regras de tokenização usando expressões regulares.
   - [ ] Testar o lexer em trechos de código para garantir que identifica tokens corretamente.
   - [ ] Gerar erros específicos para tokens inválidos ou símbolos não reconhecidos.

#### 3. **Análise Sintática (Parser)**
   - [ ] Implementar o parser com base na gramática da linguagem.
   - [ ] Desenvolver a árvore de sintaxe abstrata (AST) para representar a estrutura do código.
   - [ ] Configurar o parser para identificar erros de sintaxe e relatar com clareza.
   - [ ] Testar o parser com exemplos de código (válido e inválido) para verificar que a AST está correta.

#### 4. **Análise Semântica**
   - [ ] Implementar a tabela de símbolos para armazenar informações sobre variáveis, tipos, funções, etc.
   - [ ] Adicionar verificações de tipos e regras semânticas (ex.: verificar operações válidas entre tipos).
   - [ ] Desenvolver um sistema de detecção de escopo (global, local) para variáveis e funções.
   - [ ] Testar com códigos que contenham erros de semântica para garantir mensagens de erro informativas.

#### 5. **Otimização de Código (Opcional)**
   - [ ] Identificar e implementar otimizações básicas (ex.: eliminação de expressões comuns, inlining).
   - [ ] Otimizar loops, constantes, e remover variáveis ou expressões desnecessárias.
   - [ ] Testar o compilador com exemplos grandes para garantir que as otimizações estão funcionando.

#### 6. **Geração de Código Intermediário**
   - [ ] Implementar a geração de código intermediário (ex.: bytecode ou IR - Intermediate Representation).
   - [ ] Converter a AST em código intermediário (estrutura mais próxima da máquina).
   - [ ] Testar o código intermediário para verificar se representa corretamente o código fonte.

#### 7. **Geração de Código Final**
   - [ ] Traduzir o código intermediário para a linguagem de máquina final (ex.: assembly).
   - [ ] Implementar alocação de registros e controle de fluxo de instruções.
   - [ ] Testar o código final em um ambiente simulado (ou na máquina de destino) para confirmar a execução correta.

#### 8. **Ligação e Montagem**
   - [ ] Implementar ou utilizar um montador para traduzir o código assembly para código de máquina.
   - [ ] Ligar o código com bibliotecas necessárias (ex.: biblioteca padrão da linguagem).
   - [ ] Gerar o executável final ou o bytecode pronto para execução.
   - [ ] Testar o programa compilado em diversos cenários e validar o funcionamento.

#### 9. **Tratamento de Erros e Mensagens**
   - [ ] Refine as mensagens de erro para cada etapa (léxica, sintática, semântica).
   - [ ] Adicionar mensagens detalhadas para ajudar o usuário a identificar e corrigir erros.
   - [ ] Implementar melhorias para sugerir possíveis correções de erros comuns.

#### 10. **Documentação e Testes Finais**
   - [ ] Documentar o código do compilador e seu funcionamento para facilitar a manutenção.
   - [ ] Criar uma documentação de usuário com exemplos e guia de uso do compilador.
   - [ ] Escrever um conjunto de testes automatizados para cada fase do compilador.
   - [ ] Validar o desempenho e estabilidade do compilador em projetos de diferentes tamanhos e complexidade.
