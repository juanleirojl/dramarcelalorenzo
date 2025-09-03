# 🌟 Landing Page - Dra. Marcela Lorenzo

![Dra. Marcela Lorenzo](https://img.shields.io/badge/Fonoaudióloga-Especialista-blue)
![Website](https://img.shields.io/badge/Website-Online-brightgreen)
![Responsive](https://img.shields.io/badge/Design-Responsive-orange)

Uma landing page moderna, responsiva e interativa para **Dra. Marcela Magalhães Queiroz Lorenzo Leiro**, fonoaudióloga especialista em Motricidade Orofacial.

## 🚀 [Ver Demo Online](https://juanleirojl.github.io/dramarcelalorenzo)

## 👩‍⚕️ Sobre a Profissional

**Dra. Marcela Magalhães Queiroz Lorenzo Leiro** é fonoaudióloga especialista em Motricidade Orofacial com 19 anos de experiência clínica e acadêmica. Possui Mestrado em Genética e Biodiversidade pela UFBA e especialização em Motricidade Orofacial com ênfase em disfagia.

### 🎓 Formação Acadêmica
- **Mestrado** em Genética e Biodiversidade (UFBA)
- **Especialização** em Motricidade Orofacial com ênfase em Disfagia
- **Graduação** em Fonoaudiologia

### 💼 Experiência Profissional
- **19 anos** de experiência clínica
- Coordenação de curso de bacharelado
- Docência no ensino superior (graduação e pós-graduação)
- Supervisão e orientação de estágios clínicos
- Consultoria em desenvolvimento infantil

### 🏆 Áreas de Especialização
- **Motricidade Orofacial**: Avaliação e tratamento de disfunções do sistema estomatognático
- **Disfagia**: Neonatal, pediátrica e adulto
- **Desenvolvimento Infantil**: Marcos do desenvolvimento e intervenção precoce
- **Síndromes Genéticas**: Abordagem multidisciplinar
- **Malformações Craniofaciais**: Fissuras lábiopalatinas e cirurgias ortognáticas

## 🎯 Características da Landing Page

### ✨ Design & UI/UX
- Design moderno e responsivo (mobile-first)
- Paleta de cores profissional (azul, verde, dourado)
- Tipografia elegante (Poppins + Playfair Display)
- Animações suaves e transições fluidas
- Interface acessível (WCAG guidelines)

### 📱 Seções Implementadas

#### 🏠 Página Principal (index.html)
- **Header**: Navegação fixa com logo profissional
- **Hero Section**: Apresentação com foto e estatísticas
- **Sobre**: Biografia detalhada e certificações
- **Serviços**: 5 áreas principais de atendimento
- **Experiência**: Timeline profissional interativa
- **Cursos**: Carrossel de palestras e depoimentos
- **Contato**: Formulário completo e informações

#### 🎯 Página de Mentoria (mentoria.html)
- **Hero Mentoria**: Apresentação especializada em mentoria profissional
- **6 Especializações**: 
  - Motricidade Orofacial
  - Disfagia Pediátrica
  - Desenvolvimento Infantil
  - Síndromes Genéticas
  - Alimentação Infantil
  - Reabilitação Pós-Cirúrgica
- **Metodologia**: 5 etapas estruturadas de aprendizado
- **Planos de Mentoria**:
  - **Básica**: R$ 1.200 (3 meses, consultorias individuais)
  - **Premium**: R$ 2.500 (6 meses, grupo + individual + certificado)
  - **VIP**: R$ 3.500 (12 meses, acompanhamento completo + networking)

### ⚡ Funcionalidades
- Menu mobile responsivo com animações
- Navegação suave entre seções (smooth scroll)
- Sistema de páginas múltiplas (index.html + mentoria.html)
- Carrossel automático de depoimentos
- Formulário de contato com validação em tempo real
- Animações on-scroll (AOS library)
- Contadores animados de estatísticas
- Botão "voltar ao topo" com efeito
- Loading screen personalizada
- Otimizações de performance (lazy loading)
- WhatsApp integration para contato direto
- Sistema de notificações interativas
- Design adaptativo para todas as telas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Semântico e estruturado (2 páginas principais)
- **CSS3**: Grid, Flexbox, Custom Properties, Animations, Media Queries
- **JavaScript ES6+**: Classes, Modules, Async/Await, DOM Manipulation

### Libraries & Frameworks
- **Font Awesome 6.0**: Ícones vetoriais
- **AOS (Animate On Scroll)**: Animações suaves
- **Google Fonts**: Poppins + Playfair Display

### Estrutura de Arquivos
```
📁 dramarcelalorenzo/
├── 📄 index.html              # Página principal
├── 📄 mentoria.html           # Página de mentoria
├── 📄 styles.css              # Estilos principais
├── 📄 mentoria-styles.css     # Estilos da mentoria
├── 📄 script.js               # Scripts principais
├── 📄 mentoria-script.js      # Scripts da mentoria
├── 🖼️ logo-marcela-lorenzo.svg # Logo profissional
├── 🖼️ dr-marcela-consultorio.png # Foto do consultório
└── 📄 README.md               # Documentação
```

## 📋 Como usar

### Executar localmente:
```bash
# Clone o repositório
git clone https://github.com/juanleirojl/dramarcelalorenzo.git

# Navegue até o diretório
cd dramarcelalorenzo

# Inicie um servidor local (Python)
python -m http.server 8000

# Ou usando Node.js
npx serve .

# Acesse http://localhost:8000
```

### Deploy:
- **GitHub Pages**: Configurado automaticamente
- **Netlify**: Arraste e solte a pasta
- **Vercel**: Conecte o repositório

## 🎨 Paleta de Cores

```css
--primary-color: #6EC1E4   /* Azul claro */
--secondary-color: #A8E063 /* Verde suave */
--accent-color: #FFD700    /* Dourado */
--text-dark: #2c3e50      /* Texto principal */
--text-light: #7f8c8d     /* Texto secundário */
```

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- **Desktop**: 1200px+ (layout em grid)
- **Tablet**: 768px - 1199px (ajustes de espaçamento)
- **Mobile**: 320px - 767px (stack vertical, touch-friendly)

## ⚡ Performance

- Lazy loading de imagens não críticas
- CSS e JavaScript otimizados e minificados
- Animações com GPU acceleration
- Debounce e throttle em eventos de scroll
- Preload de fontes críticas
- Compressão de recursos

## 🔧 Customização

### Informações de contato:
Edite as variáveis no início do `script.js`:
```javascript
const CONTACT_INFO = {
  phone: '(71) 99999-9999',
  email: 'dra.marcela@exemplo.com',
  whatsapp: '5571999999999',
  // ...
};
```

### Cores e estilos:
Modifique as variáveis CSS em `styles.css`:
```css
:root {
  --primary-color: #sua-cor;
  --secondary-color: #sua-cor;
  /* ... */
}
```

## 📈 SEO & Analytics

- Meta tags otimizadas para redes sociais
- Estrutura HTML semântica
- Schema markup implementado
- Google Analytics ready
- Performance score 95+

## ♿ Acessibilidade

- Contraste adequado (WCAG AA compliance)
- Navegação completa por teclado
- Labels e ARIA attributes apropriados
- Suporte para screen readers
- Respeita preferências de movimento reduzido

## 📞 Contato da Profissional

### 🏥 Consultório
- **Endereço**: Salvador, Bahia
- **Horário**: Segunda a Sexta, 8h às 18h
- **Agendamento**: Via WhatsApp ou telefone

### 📱 Canais de Comunicação
- **WhatsApp**: [+55 (71) 99999-9999](https://wa.me/5571999999999)
- **Email**: contato@drmarcelalonenzo.com
- **Instagram**: [@drmarcelalonenzo](https://instagram.com/drmarcelalonenzo)
- **LinkedIn**: [Marcela Lorenzo](https://linkedin.com/in/marcela-lorenzo)

### 🎯 Como Agendar
1. **Primeira Consulta**: Através do WhatsApp ou site
2. **Emergências**: Contato direto via telefone
3. **Mentoria**: Formulário específico na página de mentoria
4. **Palestras**: Contato via email ou redes sociais

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

---

## 🎯 Serviços Oferecidos

### 👶 Atendimento Clínico
- **Avaliação Fonoaudiológica Completa**: Diagnóstico detalhado das funções orais
- **Terapia de Motricidade Orofacial**: Reabilitação de funções de sucção, deglutição, mastigação e fala
- **Disfagia Pediátrica**: Tratamento de dificuldades alimentares em crianças
- **Acompanhamento Pós-Cirúrgico**: Reabilitação após cirurgias ortognáticas e fissuras
- **Estimulação Precoce**: Intervenção em bebês e crianças pequenas

### 🧠 Especialidades Avançadas
- **Síndromes Genéticas**: Abordagem multidisciplinar especializada
- **Malformações Craniofaciais**: Tratamento integrado
- **Transtornos do Neurodesenvolvimento**: Avaliação e intervenção
- **Integração Sensorial**: Terapia multissensorial
- **Introdução Alimentar**: BLW e outras abordagens

### 👩‍🏫 Mentoria Profissional
Programa exclusivo para fonoaudiólogos que desejam se especializar em:
- **6 Áreas de Especialização**: Motricidade, Disfagia, Desenvolvimento, Síndromes, Alimentação, Reabilitação
- **3 Planos Disponíveis**: Básica (R$ 1.200), Premium (R$ 2.500), VIP (R$ 3.500)
- **Metodologia Estruturada**: 5 etapas de aprendizado progressivo
- **Certificação**: Incluída nos planos Premium e VIP

### 🎤 Palestras e Capacitações
- **Workshops**: Temas especializados para profissionais
- **Palestras**: Para pais, escolas e equipes de saúde
- **Supervisão Clínica**: Para estudantes e profissionais
- **Consultoria**: Para clínicas e hospitais

## 🏆 Certificações e Especializações

### � Certificações Internacionais
- **Intervenção PROMPT I** (The PROMPT Institute)
- **Terapia Multissensorial Snoezelen**
- **Sistema de Estimulação Neuro-Auditivo (SENA)**

### 🎓 Capacitações Especializadas
- **Integração Sensorial**: Abordagem terapêutica avançada
- **Denver II**: Teste de screening para desenvolvimento infantil
- **Fundamentos da Abordagem Integrativa**: Dificuldades alimentares infantis
- **BLW (Baby Led Weaning)**: Introdução alimentar
- **Disfunções Orofaciais**: Avaliação e tratamento

## 📈 Resultados e Impacto

### 📊 Estatísticas Profissionais
- **19 anos** de experiência clínica
- **500+** pacientes atendidos anualmente
- **50+** profissionais mentorados
- **100+** palestras e workshops ministrados
- **95%** de satisfação dos pacientes

### 🎯 Público Atendido
- **Bebês e Crianças**: 0 a 12 anos com dificuldades alimentares e de desenvolvimento
- **Adolescentes e Adultos**: Reabilitação pós-cirúrgica e disfunções orofaciais
- **Profissionais de Saúde**: Fonoaudiólogos, pediatras, terapeutas
- **Equipes Multidisciplinares**: Hospitais, clínicas e centros de reabilitação

---

**💙 Desenvolvido com carinho para cuidar melhor**

![Footer](https://img.shields.io/badge/Made%20with-❤️-red)
