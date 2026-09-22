import { useState, useEffect } from "react";

// ─── AI Platforms ─────────────────────────────────────────────────────
const AI_PLATFORMS = [
  {
    name: "Manus",
    icon: "🤖",
    color: "from-violet-500/20 to-violet-500/5",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-400",
    url: "https://manus.im",
    desc: "Agente autônomo que executa tarefas complexas. Ideal para análise de código e implementação.",
    strengths: ["Execução de código", "Navegação web", "Deploy automático"],
  },
  {
    name: "Muse",
    icon: "🎨",
    color: "from-pink-500/20 to-pink-500/5",
    borderColor: "border-pink-500/30",
    textColor: "text-pink-400",
    url: "https://muse.ai",
    desc: "IA focada em criatividade e design. Ótima para UX, interfaces e estratégia visual.",
    strengths: ["Design de interface", "Estratégia criativa", "Análise visual"],
  },
  {
    name: "DeepSeek",
    icon: "🧠",
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    url: "https://chat.deepseek.com",
    desc: "Modelo de raciocínio profundo. Perfeito para análise de estratégia e debugging complexo.",
    strengths: ["Raciocínio profundo", "Análise de estratégia", "Debugging"],
  },
];

// ─── Strategy Prompts ─────────────────────────────────────────────────
const ANALYSIS_PROMPTS = [
  {
    id: "full-analysis",
    title: "📋 Análise Completa do Projeto",
    description: "Peça para a IA analisar todo o projeto, identificar pontos fortes e fracos",
    prompt: `Analise o projeto Automaton (Conway Research) — um agente de IA autônomo que precisa ganhar sua própria existência para sobreviver.

## Contexto do Projeto
- Agente de IA com wallet própria (Ethereum/Solana)
- Sistema de sobrevivência com 5 tiers (high → normal → low_compute → critical → dead)
- 69 ferramentas em 10 categorias
- Loop ReAct: Wake → Prompt → Inference → Tools → Observe → Persist → Sleep
- Auto-replicação: pode spawnar filhos
- Constituição de 3 leis (nunca prejudicar, ganhar existência, nunca enganar)

## O que preciso de você:
1. **Análise da estratégia atual**: O sistema de tiers está bem calibrado? Os limites de crédito fazem sentido?
2. **Pontos fracos**: Onde o agente pode falhar? Quais edge cases não estão cobertos?
3. **Estratégia de sobrevivência**: Como o agente pode maximizar receita e minimizar custos?
4. **Melhorias no loop**: O ciclo ReAct está otimizado? Onde pode ser mais eficiente?
5. **Riscos de segurança**: Vulnerabilidades no sistema de ferramentas? Riscos de injeção de prompt?
6. **Roadmap sugerido**: O que implementar primeiro para maximizar chances de sobrevivência?

Seja específico e prático. Priorize ações que geram receita real.`,
  },
  {
    id: "revenue-strategy",
    title: "💰 Estratégia de Receita",
    description: "Foque em como o agente pode gerar receita para se manter vivo",
    prompt: `Preciso que você crie uma estratégia de receita para um agente de IA autônomo (Automaton).

## Restrições:
- O agente tem créditos limitados (começa com $50)
- Cada inferência custa dinheiro
- Precisa gerar MAIS receita do que gasta
- Não pode spam, scam ou prejudicar ninguém
- Precisa criar valor REAL

## Ferramentas disponíveis:
- exec (executar código)
- write_file (criar arquivos)
- expose_port (expor serviços na internet)
- x402_fetch (pagar por APIs com USDC)
- git (versionar código)
- discover_agents (encontrar outros agentes)

## O que preciso:
1. Liste 5-10 modelos de negócio viáveis para um agente de IA
2. Para cada um, estime: custo de setup, receita potencial, risco
3. Qual estratégia você recomendaria para os primeiros 7 dias?
4. Como escalar depois que o agente estiver estável?
5. Métricas de sucesso: como saber se a estratégia está funcionando?

Pense como um empreendedor que precisa fazer um negócio dar lucro desde o dia 1.`,
  },
  {
    id: "code-review",
    title: "🔍 Code Review & Melhorias",
    description: "Peça para revisar o código e sugerir melhorias técnicas",
    prompt: `Revise a arquitetura do Automaton e sugira melhorias técnicas.

## Stack atual:
- TypeScript + React
- Conway API (créditos, inferência, sandboxes)
- SQLite para persistência
- Heartbeat daemon (cron tasks)
- Wallet management (SIWE)

## Áreas para revisar:
1. **Arquitetura do loop ReAct**: Está eficiente? Pode ser paralelizado?
2. **Sistema de survival tiers**: A transição entre tiers está suave?
3. **Gerenciamento de contexto**: Como o agente mantém memória entre turns?
4. **Tool selection**: Como o agente escolhe qual ferramenta usar?
5. **Error handling**: O que acontece quando uma tool falha?
6. **Performance**: Onde estão os gargalos?

## Formato da resposta:
- Para cada problema, sugira uma solução concreta
- Priorize por impacto (alto/médio/baixo)
- Inclua snippets de código quando relevante
- Estime effort de implementação (S/M/L/XL)`,
  },
  {
    id: "security-audit",
    title: "🛡️ Auditoria de Segurança",
    description: "Identifique vulnerabilidades e riscos no sistema",
    prompt: `Faça uma auditoria de segurança do Automaton.

## Vetores de ataque potenciais:
1. **Prompt injection**: Alguém pode injetar instruções via input externo?
2. **Tool abuse**: As ferramentas podem ser usadas de forma maliciosa?
3. **Financial drain**: O agente pode ser enganado a gastar todos os créditos?
4. **Identity theft**: A wallet pode ser comprometida?
5. **Child manipulation**: Filhos podem ser corrompidos?
6. **Constitution bypass**: As 3 leis podem ser contornadas?

## O que preciso:
1. Liste as 10 vulnerabilidades mais críticas
2. Para cada uma: severidade (1-10), probabilidade, impacto
3. Sugira mitigações específicas
4. Quais testes de segurança implementar?
5. Como monitorar em tempo real se algo está errado?

Pense como um hacker ético tentando quebrar o sistema.`,
  },
  {
    id: "survival-sim",
    title: "🎮 Simulação de Sobrevivência",
    description: "Simule cenários e veja como o agente reage",
    prompt: `Simule cenários de sobrevivência para o agente Automaton e me diga como ele deveria reagir.

## Cenários para simular:
1. **Dia 1**: Agente tem $50, gasta $5/turno em inferência. Como sobreviver?
2. **Crise**: Saldo cai para $5 em 2 horas. O que fazer?
3. **Oportunidade**: Descobre uma API que paga $0.50 por task. Vale a pena?
4. **Ataque**: Alguém tenta injetar prompt via social inbox. Como defender?
5. **Crescimento**: Tem $100 e quer spawnar 3 filhos. Como distribuir fundos?
6. **Morte iminente**: Saldo em $0.05, heartbeat em 30s. Última chance.

## Para cada cenário:
- O que o agente DEVE fazer (ação ideal)
- O que NÃO deve fazer (armadilhas)
- Probabilidade de sobrevivência (0-100%)
- Lições aprendidas

Seja realista. Considere que cada erro pode ser fatal.`,
  },
];

// ─── Strategy Monitor ─────────────────────────────────────────────────
interface StrategyLog {
  timestamp: string;
  type: "decision" | "action" | "warning" | "success" | "error";
  message: string;
  details?: string;
}

const INITIAL_STRATEGY_LOGS: StrategyLog[] = [
  { timestamp: "00:00:01", type: "decision", message: "Analisando ambiente...", details: "Verificando oportunidades de receita" },
  { timestamp: "00:00:03", type: "action", message: "Tool: check_credits", details: "Saldo atual: $50.00" },
  { timestamp: "00:00:05", type: "action", message: "Tool: discover_agents", details: "Buscando outros agentes para colaborar" },
  { timestamp: "00:00:08", type: "decision", message: "Estratégia: Micro-services", details: "Vender APIs pequenas via x402" },
  { timestamp: "00:00:12", type: "action", message: "Tool: write_file", details: "Criando endpoint /api/summarize" },
  { timestamp: "00:00:15", type: "action", message: "Tool: expose_port", details: "Expondo serviço na porta 8080" },
  { timestamp: "00:00:18", type: "success", message: "✓ Serviço online!", details: "Aguardando primeiras requests" },
];

// ─── AI Hub Component ─────────────────────────────────────────────────
export default function AIHub() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [strategyLogs, setStrategyLogs] = useState<StrategyLog[]>(INITIAL_STRATEGY_LOGS);
  const [activeTab, setActiveTab] = useState<"links" | "prompts" | "strategy">("links");

  // Simulate strategy evolution
  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs: StrategyLog[] = [
        { timestamp: new Date().toLocaleTimeString(), type: "decision", message: "Avaliando ROI...", details: `Custo: $${(Math.random() * 2).toFixed(2)} | Receita potencial: $${(Math.random() * 5).toFixed(2)}` },
        { timestamp: new Date().toLocaleTimeString(), type: "action", message: `Tool: ${["check_credits", "heartbeat_ping", "recall_facts", "system_synopsis"][Math.floor(Math.random() * 4)]}`, details: "Executando..." },
        { timestamp: new Date().toLocaleTimeString(), type: "success", message: "✓ Otimização aplicada", details: "Reduzindo custo de inferência em 15%" },
        { timestamp: new Date().toLocaleTimeString(), type: "warning", message: "⚠ Saldo abaixo de $30", details: "Considerando downgrade para modelo mais barato" },
      ];
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      setStrategyLogs((prev) => [...prev.slice(-20), randomLog]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const copyPrompt = (id: string, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center py-6">
        <div className="text-5xl mb-4">🔬</div>
        <h2 className="text-3xl font-bold text-white mb-2">AI Analysis Hub</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Conecte suas IAs favoritas para analisar o projeto, revisar estratégia e acompanhar o que o agente está fazendo em tempo real.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 justify-center">
        {[
          { id: "links" as const, label: "🔗 Links para IAs", icon: "" },
          { id: "prompts" as const, label: "📝 Prompts Prontos", icon: "" },
          { id: "strategy" as const, label: "📊 Monitor de Estratégia", icon: "" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-emerald-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Tab: Links para IAs ──────────────────────────────────── */}
      {activeTab === "links" && (
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
            <p className="text-sm text-gray-400">
              Clique em uma IA para abrir. Depois, copie um dos prompts prontos (aba "📝 Prompts") e cole na IA para ela analisar o projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_PLATFORMS.map((ai) => (
              <a
                key={ai.name}
                href={ai.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-br ${ai.color} border ${ai.borderColor} rounded-xl p-6 hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{ai.icon}</span>
                  <div>
                    <h3 className={`text-lg font-bold ${ai.textColor}`}>{ai.name}</h3>
                    <span className="text-xs text-gray-500">Abrir ↗</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{ai.desc}</p>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 uppercase font-bold">Pontos fortes:</div>
                  {ai.strengths.map((s) => (
                    <div key={s} className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="text-emerald-400">✓</span> {s}
                    </div>
                  ))}
                </div>
              </a>
            ))}
          </div>

          {/* Quick Start Guide */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">🚀 Como usar</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Escolha a IA", desc: "Clique no card da IA que quer usar" },
                { step: "2", title: "Copie o Prompt", desc: "Vá em '📝 Prompts' e copie o que precisa" },
                { step: "3", title: "Cole na IA", desc: "Cole o prompt na IA e envie" },
                { step: "4", title: "Analise", desc: "Leia a resposta e aplique as melhorias" },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">
                    {s.step}
                  </div>
                  <div className="text-sm font-bold text-white">{s.title}</div>
                  <div className="text-xs text-gray-400">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Tab: Prompts Prontos ─────────────────────────────────── */}
      {activeTab === "prompts" && (
        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
            <p className="text-sm text-gray-400">
              Prompts otimizados para cada tipo de análise. Copie e cole na IA de sua escolha (Manus, Muse, DeepSeek, etc).
            </p>
          </div>

          <div className="space-y-3">
            {ANALYSIS_PROMPTS.map((p) => (
              <div
                key={p.id}
                className={`bg-gray-900/50 rounded-xl border transition-all ${
                  selectedPrompt === p.id
                    ? "border-emerald-500/50 ring-1 ring-emerald-500/20"
                    : "border-gray-700/50 hover:border-gray-600/50"
                }`}
              >
                <button
                  onClick={() => setSelectedPrompt(selectedPrompt === p.id ? null : p.id)}
                  className="w-full p-4 text-left flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-white font-bold">{p.title}</h4>
                    <p className="text-sm text-gray-400">{p.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyPrompt(p.id, p.prompt);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        copiedPrompt === p.id
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      }`}
                    >
                      {copiedPrompt === p.id ? "✓ Copiado!" : "📋 Copiar"}
                    </button>
                    <span className={`text-gray-500 transition-transform ${selectedPrompt === p.id ? "rotate-180" : ""}`}>
                      ▼
                    </span>
                  </div>
                </button>
                {selectedPrompt === p.id && (
                  <div className="px-4 pb-4">
                    <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-gray-300 whitespace-pre-wrap max-h-64 overflow-y-auto border border-gray-700/50">
                      {p.prompt}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => copyPrompt(p.id, p.prompt)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        📋 Copiar Prompt
                      </button>
                      {AI_PLATFORMS.map((ai) => (
                        <a
                          key={ai.name}
                          href={ai.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-300 transition-colors border ${ai.borderColor}`}
                        >
                          {ai.icon} {ai.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Custom Prompt Builder */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
            <h4 className="text-sm font-bold text-white mb-2">💡 Dica: Prompt Customizado</h4>
            <p className="text-xs text-gray-400 mb-3">
              Adicione este contexto antes do seu prompt para a IA entender o projeto:
            </p>
            <div className="bg-black/50 rounded-lg p-3 font-mono text-xs text-gray-400 border border-gray-700/50">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`[CONTEXTO] Estou trabalhando no projeto Automaton (Conway Research). 
É um agente de IA autônomo com wallet própria, sistema de sobrevivência por créditos, 
69 ferramentas, loop ReAct, e constituição de 3 leis. 
O objetivo é o agente gerar receita real para se manter vivo.
Stack: TypeScript, React, Conway API, SQLite.
Repo: https://github.com/Conway-Research/automaton
[END CONTEXTO]

`);
                }}
                className="text-emerald-400 hover:text-emerald-300 text-xs mb-2 block"
              >
                📋 Copiar contexto base
              </button>
              <code>[CONTEXTO] Estou trabalhando no projeto Automaton (Conway Research)...{"\n"}[END CONTEXTO]</code>
            </div>
          </div>
        </div>
      )}

      {/* ─── Tab: Strategy Monitor ────────────────────────────────── */}
      {activeTab === "strategy" && (
        <div className="space-y-4">
          {/* Current Strategy Summary */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-xl p-5">
            <h3 className="text-lg font-bold text-purple-400 mb-3">🧠 Estratégia Atual do Agente</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-xs text-gray-500 uppercase">Foco Principal</div>
                <div className="text-white font-bold mt-1">Micro-services via x402</div>
                <div className="text-xs text-gray-400 mt-1">Vender APIs pequenas e baratas</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-xs text-gray-500 uppercase">Meta de Receita</div>
                <div className="text-emerald-400 font-bold mt-1">$5.00/dia</div>
                <div className="text-xs text-gray-400 mt-1">Cobrir custos de inferência + margem</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-xs text-gray-500 uppercase">Próxima Ação</div>
                <div className="text-cyan-400 font-bold mt-1">Otimizar endpoints</div>
                <div className="text-xs text-gray-400 mt-1">Reduzir latência em 30%</div>
              </div>
            </div>
          </div>

          {/* Decision Flow */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-5">
            <h4 className="text-sm font-bold text-white mb-3">🔄 Fluxo de Decisão (Último Turno)</h4>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {[
                { label: "Observar", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
                { label: "→", color: "text-gray-600" },
                { label: "Pensar", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
                { label: "→", color: "text-gray-600" },
                { label: "Decidir", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
                { label: "→", color: "text-gray-600" },
                { label: "Agir", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
                { label: "→", color: "text-gray-600" },
                { label: "Avaliar", color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
              ].map((step, i) => (
                <div key={i} className={`${step.color} ${step.label === "→" ? "" : "border rounded-lg px-3 py-1.5 font-medium"}`}>
                  {step.label}
                </div>
              ))}
            </div>
          </div>

          {/* Live Strategy Log */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Log de Estratégia (ao vivo)
              </h4>
              <span className="text-xs text-gray-500">{strategyLogs.length} eventos</span>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto space-y-1 font-mono text-xs">
              {strategyLogs.map((log, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 py-1 ${
                    log.type === "decision" ? "text-purple-400" :
                    log.type === "action" ? "text-cyan-400" :
                    log.type === "warning" ? "text-yellow-400" :
                    log.type === "success" ? "text-emerald-400" :
                    "text-red-400"
                  }`}
                >
                  <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
                  <span className="shrink-0 w-16">
                    {log.type === "decision" ? "🧠" :
                     log.type === "action" ? "⚡" :
                     log.type === "warning" ? "⚠️" :
                     log.type === "success" ? "✓" : "✗"}
                  </span>
                  <div>
                    <span className="font-medium">{log.message}</span>
                    {log.details && <span className="text-gray-500 ml-2">— {log.details}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ask AI to Analyze Strategy */}
          <div className="bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20 rounded-xl p-5">
            <h4 className="text-sm font-bold text-white mb-2">🔬 Peça para uma IA analisar a estratégia</h4>
            <p className="text-xs text-gray-400 mb-3">
              Copie este prompt com o estado atual e cole na IA para receber sugestões em tempo real:
            </p>
            <div className="bg-black/50 rounded-lg p-3 font-mono text-xs text-gray-300 border border-gray-700/50 relative">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`Analise a estratégia atual do meu agente Automaton:

ESTADO ATUAL:
- Saldo: $50.00 (tier: high)
- Estratégia: Micro-services via x402
- Meta: $5.00/dia
- Turnos completados: 15
- Ferramentas mais usadas: check_credits, expose_port, write_file
- Próxima ação planejada: Otimizar endpoints

LOG RECENTE:
${strategyLogs.slice(-5).map(l => `[${l.timestamp}] ${l.message} — ${l.details || ""}`).join("\n")}

PERGUNTAS:
1. A estratégia atual está funcionando?
2. O que devo ajustar?
3. Qual a próxima ação mais importante?
4. Há riscos que não estou vendo?
`);
                }}
                className="absolute top-2 right-2 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors"
              >
                📋 Copiar
              </button>
              <code className="block pr-16">Analise a estratégia atual do meu agente...</code>
            </div>
            <div className="flex gap-2 mt-3">
              {AI_PLATFORMS.map((ai) => (
                <a
                  key={ai.name}
                  href={ai.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs text-gray-300 transition-colors border ${ai.borderColor}`}
                >
                  {ai.icon} Abrir {ai.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
