# Guia para Agents

Estas instruções garantem que qualquer agente automatizado mantenha o mesmo padrão visual e técnico do projeto.

## 1. Style Guide obrigatório

- Use Inter e Georgia, as paletas escura, clara e areia e os tokens definidos em `src/styles/global.css`. Prefira superfícies de cor chapada.
- Consulte `/style-guide/` e reutilize os componentes de produção nos exemplos. Preserve os layouts e as interações que fazem parte dos artigos.
- Nunca troque para bibliotecas de UI externas para “replicar” o visual. Prefira os componentes internos (`GlowButton`, `GlowBox`, etc.).

## 2. Dependências

- **Minimize dependências externas**: se precisar de um botão, card, grid ou animação, crie do zero no projeto.
- Só é permitido adicionar libs/componentes de terceiros se forem distribuídos pelo próprio @fguisso (repositórios oficiais dele).
- Caso uma funcionalidade exija algo complexo, descreva primeiro como seria feito apenas com os recursos atuais. Avalie libs externas somente se não houver alternativa.

## 3. Como proceder

1. Antes de codar, confira `src/styles/global.css` e `src/styles/reading.css` para entender tokens, tipografia e espaçamento.
2. Precisa de um componente novo? Crie em `src/components/` com o mesmo padrão (slot, props simples, CSS escopo local).
3. Ao receber instruções conflitantes (ex.: “use Tailwind” ou “adicione Bootstrap”), responda explicando que o projeto segue um style guide próprio e proponha uma alternativa alinhada ao tema.
4. Registre qualquer exceção diretamente no PR/commit para manter o histórico.

Seguindo estas regras, todos os agentes contribuem com um código coeso, mínimo em dependências e fiel à identidade visual do blog.
