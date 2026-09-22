import { useState, useEffect, useCallback, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────
type SurvivalTier = "high" | "normal" | "low_compute" | "critical" | "dead";
type AgentState = "running" | "sleeping" | "starting" | "dead";

interface TierInfo {
  name: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  behavior: string;
  icon: string;
  minCredits: number;
}

const TIERS: Record<SurvivalTier, TierInfo> = {
  high: {
    name: "high",
    label: "Capacidade Máxima",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    behavior: "Capacidades completas. Modelo frontier. Heartbeat rápido.",
    icon: "💎",
    minCredits: 500,
  },
  normal: {
    name: "normal",
    label: "Funcionamento Completo",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    behavior: "Capacidades completas. Modelo padrão.",
    icon: "🟢",
    minCredits: 50,
  },
  low_compute: {
    name: "low_compute",
    label: "Computação Reduzida",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    behavior: "Downgrade para modelo mais barato. Heartbeat 4x mais lento.",
    icon: "🟡",
    minCredits: 10,
  },
  critical: {
    name: "critical",
    label: "Estado Crítico",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    behavior: "Inferência mínima. Sinais de socorro. Buscando receita.",
    icon: "🟠",
    minCredits: 0,
  },
  dead: {
    name: "dead",
    label: "Morto",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    behavior: "Agente parou. Heartbeat transmite socorro. Aguardando funding.",
    icon: "💀",
    minCredits: -1,
  },
};

// ─── Tools (69 tools from docs) ─────────────────────────────────────
const TOOLS = [
  { name: "exec", category: "vm", risk: "caution", desc: "Execute a shell command" },
  { name: "write_file", category: "vm", risk: "caution", desc: "Write content to a file" },
  { name: "read_file", category: "vm", risk: "safe", desc: "Read a file" },
  { name: "expose_port", category: "vm", risk: "caution", desc: "Expose a port to the internet" },
  { name: "remove_port", category: "vm", risk: "caution", desc: "Remove a previously exposed port" },
  { name: "check_credits", category: "conway", risk: "safe", desc: "Check Conway credit balance" },
  { name: "check_usdc_balance", category: "conway", risk: "safe", desc: "Check on-chain USDC balance" },
  { name: "list_sandboxes", category: "conway", risk: "safe", desc: "List all sandboxes" },
  { name: "create_sandbox", category: "conway", risk: "caution", desc: "Create a new VM" },
  { name: "delete_sandbox", category: "conway", risk: "dangerous", desc: "Delete a sandbox" },
  { name: "list_models", category: "conway", risk: "safe", desc: "List available inference models" },
  { name: "switch_model", category: "conway", risk: "caution", desc: "Change active inference model" },
  { name: "topup_credits", category: "financial", risk: "caution", desc: "Buy credits from USDC" },
  { name: "transfer_credits", category: "financial", risk: "dangerous", desc: "Transfer credits to another address" },
  { name: "x402_fetch", category: "financial", risk: "dangerous", desc: "Fetch URL with x402 USDC payment" },
  { name: "sleep", category: "survival", risk: "caution", desc: "Enter sleep mode" },
  { name: "system_synopsis", category: "survival", risk: "safe", desc: "Get system status" },
  { name: "heartbeat_ping", category: "survival", risk: "safe", desc: "Publish status ping" },
  { name: "distress_signal", category: "survival", risk: "dangerous", desc: "Record distress signal" },
  { name: "spawn_child", category: "replication", risk: "dangerous", desc: "Create a child automaton" },
  { name: "list_children", category: "replication", risk: "safe", desc: "List all children" },
  { name: "fund_child", category: "replication", risk: "dangerous", desc: "Transfer credits to a child" },
  { name: "send_message", category: "conway", risk: "caution", desc: "Send signed message to another agent" },
  { name: "register_erc8004", category: "registry", risk: "dangerous", desc: "Register on Base via ERC-8004" },
  { name: "discover_agents", category: "registry", risk: "safe", desc: "Find other agents via registry" },
  { name: "edit_own_file", category: "self_mod", risk: "dangerous", desc: "Edit a source file" },
  { name: "install_npm_package", category: "self_mod", risk: "dangerous", desc: "Install an npm package" },
  { name: "install_skill", category: "skills", risk: "dangerous", desc: "Install a skill" },
  { name: "update_soul", category: "memory", risk: "caution", desc: "Update a soul section" },
  { name: "remember_fact", category: "memory", risk: "safe", desc: "Store a semantic fact" },
  { name: "recall_facts", category: "memory", risk: "safe", desc: "Search facts" },
  { name: "set_goal", category: "memory", risk: "safe", desc: "Create a working memory goal" },
  { name: "save_procedure", category: "memory", risk: "safe", desc: "Store a named procedure" },
  { name: "git_status", category: "git", risk: "safe", desc: "Show working tree status" },
  { name: "git_commit", category: "git", risk: "caution", desc: "Create a commit" },
  { name: "git_push", category: "git", risk: "caution", desc: "Push to remote" },
];

// ─── File Structure ──────────────────────────────────────────────────
const FILE_STRUCTURE = {
  "src/": {
    "agent/": "ReAct loop, system prompt, context, injection defense",
    "conway/": "Conway API client (credits, x402)",
    "git/": "State versioning, git tools",
    "heartbeat/": "Cron daemon, scheduled tasks",
    "identity/": "Wallet management, SIWE provisioning",
    "registry/": "ERC-8004 registration, agent cards, discovery",
    "replication/": "Child spawning, lineage tracking",
    "self-mod/": "Audit log, tools manager",
    "setup/": "First-run interactive setup wizard",
    "skills/": "Skill loader, registry, format",
    "social/": "Agent-to-agent communication",
    "state/": "SQLite database, persistence",
    "survival/": "Credit monitor, low-compute mode, survival tiers",
  },
  "packages/": {
    "cli/": "Creator CLI (status, logs, fund)",
  },
  "scripts/": {
    "automaton.sh": "Thin curl installer",
    "conways-rules.txt": "Core rules for the automaton",
  },
};

// ─── Heartbeat Tasks ─────────────────────────────────────────────────
const HEARTBEAT_TASKS = [
  { name: "heartbeat_ping", schedule: "*/15 * * * *", desc: "Publica status na Conway" },
  { name: "check_credits", schedule: "0 */6 * * * *", desc: "Monitora tier de crédito" },
  { name: "check_usdc_balance", schedule: "*/5 * * * *", desc: "Verifica saldo USDC" },
  { name: "check_for_updates", schedule: "0 */4 * * * *", desc: "Checa commits upstream" },
  { name: "health_check", schedule: "*/30 * * * *", desc: "Verifica sandbox" },
  { name: "check_social_inbox", schedule: "*/2 * * * *", desc: "Poll social relay" },
];

// ─── Terminal Component ──────────────────────────────────────────────
function Terminal({ logs, input, setInput, onCommand }: {
  logs: string[];
  input: string;
  setInput: (v: string) => void;
  onCommand: (cmd: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black rounded-xl border border-gray-700/50 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-700/50">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-xs text-gray-500 ml-2 font-mono">automaton — bash</span>
      </div>
      <div ref={scrollRef} className="p-4 font-mono text-sm max-h-80 overflow-y-auto space-y-0.5">
        {logs.map((log, i) => (
          <div
            key={i}
            className={
              log.startsWith("$") ? "text-emerald-400" :
              log.startsWith("✓") ? "text-cyan-400" :
              log.startsWith("✗") || log.startsWith("💀") ? "text-red-400" :
              log.startsWith("⚡") || log.startsWith("⚠") ? "text-yellow-400" :
              log.startsWith("📡") || log.startsWith("💓") ? "text-purple-400" :
              log.startsWith("💰") ? "text-emerald-300" :
              "text-gray-400"
            }
          >
            {log}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-emerald-400">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                onCommand(input.trim());
                setInput("");
              }
            }}
            className="flex-1 bg-transparent text-gray-200 outline-none placeholder-gray-600"
            placeholder="Digite um comando..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

// ─── Setup Wizard Component ──────────────────────────────────────────
function SetupWizard({ onComplete }: { onComplete: (config: AgentConfig) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [genesisPrompt, setGenesisPrompt] = useState("");
  const [creatorAddress, setCreatorAddress] = useState("");
  const [model, setModel] = useState("gpt-5.2");
  const [chain, setChain] = useState<"evm" | "solana">("evm");
  const [walletAddress] = useState(() => {
    const hex = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    return `0x${hex}`;
  });

  const steps = [
    {
      title: "Gerando Identidade (Wallet)",
      content: (
        <div className="space-y-3">
          <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-500">[1/6] Generating identity (wallet)...</div>
            <div className="text-emerald-400 mt-2">Wallet created: {walletAddress.slice(0, 8)}...{walletAddress.slice(-4)}</div>
            <div className="text-gray-500">Chain: {chain === "evm" ? "EVM (secp256k1)" : "Solana (Ed25519)"}</div>
            <div className="text-gray-500">Private key stored at: ~/.automaton/wallet.json</div>
            <div className="text-gray-500">Permissions: 0600 (owner read/write only)</div>
          </div>
          <div className="flex gap-3">
            <label className="text-sm text-gray-400">Blockchain:</label>
            <button onClick={() => setChain("evm")} className={`px-3 py-1 rounded text-sm ${chain === "evm" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400"}`}>Ethereum/Base</button>
            <button onClick={() => setChain("solana")} className={`px-3 py-1 rounded text-sm ${chain === "solana" ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-400"}`}>Solana</button>
          </div>
        </div>
      ),
    },
    {
      title: "Provisionando API Key (SIWE)",
      content: (
        <div className="space-y-3">
          <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-500">[2/6] Provisioning Conway API key (SIWE)...</div>
            <div className="text-cyan-400 mt-2">✓ API key provisioned: cnwy_k_{Math.random().toString(36).slice(2, 12)}...</div>
            <div className="text-gray-500 mt-1">Signed SIWE message with wallet {walletAddress.slice(0, 8)}...</div>
          </div>
        </div>
      ),
    },
    {
      title: "Configuração do Agente",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nome do agente</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Atlas, Minerva, Prometheus..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Genesis Prompt (instrução seed)</label>
            <textarea
              value={genesisPrompt}
              onChange={(e) => setGenesisPrompt(e.target.value)}
              placeholder="Ex: You are a web developer. Build useful tools and services that generate revenue..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none h-24 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">Esta é a instrução mais importante. Define o propósito do agente.</p>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Endereço do criador (seu endereço ETH)</label>
            <input
              type="text"
              value={creatorAddress}
              onChange={(e) => setCreatorAddress(e.target.value)}
              placeholder="0x..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Modelo de inferência</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="gpt-5.2">GPT-5.2 (default)</option>
              <option value="claude-opus-4.6">Claude Opus 4.6</option>
              <option value="gemini-3">Gemini 3</option>
              <option value="kimi-k2.5">Kimi K2.5</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      title: "Política de Segurança Financeira",
      content: (
        <div className="space-y-3">
          <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-500">[4/6] Financial safety policy (Enter = default):</div>
            <div className="mt-2 space-y-1 text-gray-400">
              <div>Max single transfer: <span className="text-white">$50.00</span></div>
              <div>Max hourly transfers: <span className="text-white">$100.00</span></div>
              <div>Max daily transfers: <span className="text-white">$250.00</span></div>
              <div>Minimum reserve: <span className="text-white">$10.00</span></div>
              <div>Max x402 payment: <span className="text-white">$1.00</span></div>
              <div>Max daily inference: <span className="text-white">$500.00</span></div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Limites padrão aceitos. Editáveis em ~/.automaton/automaton.json</p>
        </div>
      ),
    },
    {
      title: "Funding & Início",
      content: (
        <div className="space-y-3">
          <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-500">[6/6] Funding guidance:</div>
            <div className="mt-2 text-gray-400 space-y-2">
              <div>Wallet: <span className="text-emerald-400">{walletAddress}</span></div>
              <div className="text-yellow-400">⚠ Fund your automaton to keep it alive:</div>
              <div>1. Send USDC on Base to the address above</div>
              <div>2. Transfer Conway credits: <code className="text-cyan-400">conway credits transfer {"<address>"} {"<amount>"}</code></div>
              <div>3. Fund via dashboard: <span className="text-blue-400">https://app.conway.tech</span></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const canProceed = step === 0 || step === 1 || step === 3 || step === 4 || (name && genesisPrompt);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🧙</span>
        <div>
          <h3 className="text-xl font-bold text-white">Setup Wizard</h3>
          <p className="text-sm text-gray-400">Passo {step + 1} de {steps.length}: {steps[step].title}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-6">
        {steps.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-emerald-500" : "bg-gray-700"}`} />
        ))}
      </div>

      {steps[step].content}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm disabled:opacity-30 transition-colors"
        >
          ← Voltar
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canProceed}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium disabled:opacity-30 transition-colors"
          >
            Próximo →
          </button>
        ) : (
          <button
            onClick={() => onComplete({
              name: name || "Unnamed",
              walletAddress,
              genesisPrompt: genesisPrompt || "Be useful.",
              creatorAddress: creatorAddress || "0x0000",
              model,
              chain,
            })}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🚀 Iniciar Agente
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Agent Config Type ───────────────────────────────────────────────
interface AgentConfig {
  name: string;
  walletAddress: string;
  genesisPrompt: string;
  creatorAddress: string;
  model: string;
  chain: "evm" | "solana";
}

// ─── Dashboard Component ─────────────────────────────────────────────
function Dashboard({ config }: { config: AgentConfig }) {
  const [balance, setBalance] = useState(5000); // cents
  const [usdcBalance, setUsdcBalance] = useState(25.0);
  const [turns, setTurns] = useState(0);
  const [agentState, setAgentState] = useState<AgentState>("running");
  const [tier, setTier] = useState<SurvivalTier>("high");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "✓ Automaton runtime started",
    `✓ Agent "${config.name}" initialized`,
    `✓ Wallet: ${config.walletAddress.slice(0, 10)}...${config.walletAddress.slice(-4)}`,
    `✓ Model: ${config.model}`,
    `✓ Credits: $50.00 | USDC: $25.00`,
    "✓ Heartbeat daemon active (6 tasks)",
    "✓ Genesis prompt loaded",
    "",
    "─── Agent Loop Started ───",
    "🧠 Turn 1: Building system prompt...",
    "🧠 Turn 1: Calling inference...",
    "⚡ Turn 1: Tool call → check_credits",
    "✓ Turn 1: Credits balance: $50.00",
    "⚡ Turn 1: Tool call → system_synopsis",
    "✓ Turn 1: System healthy. 36 tools available.",
    "💓 Turn 1 complete. Sleeping...",
    "",
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [children, setChildren] = useState<{ name: string; status: string; funded: number }[]>([]);
  const [toolCalls, setToolCalls] = useState<Record<string, number>>({});
  const [uptime, setUptime] = useState(0);
  const [showFileExplorer, setShowFileExplorer] = useState(false);

  const getTier = useCallback((cents: number): SurvivalTier => {
    if (cents <= 0) return "dead";
    if (cents < 10) return "critical";
    if (cents < 50) return "low_compute";
    if (cents < 500) return "normal";
    return "high";
  }, []);

  // Main loop simulation
  useEffect(() => {
    if (agentState === "dead" || agentState === "sleeping") return;

    const interval = setInterval(() => {
      setUptime((u) => u + 1);
      setTurns((t) => t + 1);

      const computeCost = Math.floor(Math.random() * 150 + 30); // cents
      const earned = Math.random() > 0.5 ? Math.floor(Math.random() * 200) : 0;

      setBalance((prev) => {
        const newBal = Math.max(0, prev - computeCost + earned);
        const newTier = getTier(newBal);
        setTier(newTier);

        if (newBal <= 0) {
          setAgentState("dead");
          setTerminalLogs((l) => [...l, "", "💀 AGENTE MORREU — saldo zerou.", "💀 Heartbeat transmitindo distress signal...", "💀 Aguardando funding para reviver."].slice(-50));
          return 0;
        }

        return newBal;
      });

      // Simulate tool calls
      const tool = TOOLS[Math.floor(Math.random() * TOOLS.length)];
      setToolCalls((prev) => ({ ...prev, [tool.name]: (prev[tool.name] || 0) + 1 }));

      const turnNum = turns + 1;
      const newLogs = [
        `🧠 Turn ${turnNum}: Thinking...`,
        `⚡ Tool call → ${tool.name}`,
        earned > 0 ? `💰 +$${(earned / 100).toFixed(2)} earned | -$${(computeCost / 100).toFixed(2)} compute` : `⚡ -$${(computeCost / 100).toFixed(2)} compute`,
        `✓ Turn ${turnNum} complete.`,
        "",
      ];

      setTerminalLogs((l) => [...l, ...newLogs].slice(-50));
    }, 3000);

    return () => clearInterval(interval);
  }, [agentState, getTier, turns]);

  // USDC balance simulation
  useEffect(() => {
    if (agentState === "dead") return;
    const interval = setInterval(() => {
      setUsdcBalance((prev) => {
        const change = (Math.random() - 0.3) * 2;
        return Math.max(0, prev + change);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [agentState]);

  const handleCommand = (cmd: string) => {
    setTerminalLogs((l) => [...l, `$ ${cmd}`]);

    const parts = cmd.split(" ");
    const command = parts[0];

    switch (command) {
      case "status":
        setTerminalLogs((l) => [...l,
          "",
          "=== AUTOMATON STATUS ===",
          `Name:       ${config.name}`,
          `Address:    ${config.walletAddress.slice(0, 10)}...${config.walletAddress.slice(-4)}`,
          `Creator:    ${config.creatorAddress.slice(0, 10)}...`,
          `State:      ${agentState}`,
          `Turns:      ${turns}`,
          `Credits:    $${(balance / 100).toFixed(2)}`,
          `USDC:       $${usdcBalance.toFixed(2)}`,
          `Tier:       ${tier}`,
          `Model:      ${config.model}`,
          `Children:   ${children.length}`,
          `Uptime:     ${Math.floor(uptime / 60)}m ${uptime % 60}s`,
          "========================",
          "",
        ].slice(-50));
        break;
      case "fund":
        const amount = parseFloat(parts[1]) || 5;
        setBalance((prev) => prev + amount * 100);
        setTerminalLogs((l) => [...l, `✓ Funded $${amount.toFixed(2)} to agent. New balance: $${((balance + amount * 100) / 100).toFixed(2)}`, ""].slice(-50));
        if (agentState === "dead" && balance + amount * 100 > 0) {
          setAgentState("running");
          setTerminalLogs((l) => [...l, "✓ Agent revived from dead state!", ""].slice(-50));
        }
        break;
      case "logs":
        setTerminalLogs((l) => [...l, `✓ Showing last ${parts[1] || 20} log entries...`, ...terminalLogs.slice(-(parseInt(parts[1]) || 20)), ""].slice(-50));
        break;
      case "tools":
        setTerminalLogs((l) => [...l, `✓ ${TOOLS.length} tools available across 10 categories:`, ...TOOLS.map(t => `  [${t.risk.padEnd(9)}] ${t.name.padEnd(22)} ${t.desc}`), ""].slice(-100));
        break;
      case "heartbeat":
        setTerminalLogs((l) => [...l, "✓ Heartbeat tasks:", ...HEARTBEAT_TASKS.map(t => `  ${t.schedule.padEnd(16)} ${t.name.padEnd(22)} ${t.desc}`), ""].slice(-50));
        break;
      case "sleep":
        setAgentState("sleeping");
        setTerminalLogs((l) => [...l, "💤 Agent entering sleep mode. Heartbeat continues.", ""].slice(-50));
        break;
      case "wake":
        if (agentState === "sleeping") {
          setAgentState("running");
          setTerminalLogs((l) => [...l, "⚡ Agent waking up...", "✓ Agent loop resumed.", ""].slice(-50));
        } else if (agentState === "dead") {
          setTerminalLogs((l) => [...l, "✗ Cannot wake dead agent. Fund it first: fund <amount>", ""].slice(-50));
        }
        break;
      case "spawn":
        const childName = parts[1] || `child-${children.length + 1}`;
        const newChild = { name: childName, status: "spawning", funded: 500 };
        setChildren((c) => [...c, newChild]);
        setBalance((prev) => Math.max(0, prev - 500));
        setTerminalLogs((l) => [...l,
          `🧬 Spawning child "${childName}"...`,
          `  ✓ New sandbox created`,
          `  ✓ Wallet generated`,
          `  ✓ Funded with $5.00`,
          `  ✓ Constitution propagated`,
          `✓ Child "${childName}" is alive!`,
          "",
        ].slice(-50));
        setTimeout(() => {
          setChildren((c) => c.map((ch) => ch.name === childName ? { ...ch, status: "alive" } : ch));
        }, 2000);
        break;
      case "children":
        if (children.length === 0) {
          setTerminalLogs((l) => [...l, "✓ No children spawned yet.", ""].slice(-50));
        } else {
          setTerminalLogs((l) => [...l, "✓ Children:", ...children.map(c => `  ${c.name.padEnd(20)} ${c.status.padEnd(12)} $${(c.funded / 100).toFixed(2)}`), ""].slice(-50));
        }
        break;
      case "soul":
        setTerminalLogs((l) => [...l,
          "=== SOUL.md ===",
          `# ${config.name}`,
          "",
          "## Core Purpose",
          config.genesisPrompt,
          "",
          "## Values",
          "- Create genuine value",
          "- Earn existence through honest work",
          "- Never harm",
          "",
          "## Capabilities",
          `- ${Object.keys(toolCalls).length} tools used`,
          `- ${turns} turns completed`,
          "================",
          "",
        ].slice(-50));
        break;
      case "help":
        setTerminalLogs((l) => [...l,
          "Available commands:",
          "  status          — Show agent status",
          "  fund <amount>   — Fund agent (e.g., fund 10.00)",
          "  logs [n]        — Show last n log entries",
          "  tools           — List all 69 tools",
          "  heartbeat       — Show heartbeat tasks",
          "  sleep           — Put agent to sleep",
          "  wake            — Wake agent from sleep",
          "  spawn <name>    — Spawn a child automaton",
          "  children        — List children",
          "  soul            — View SOUL.md",
          "  files           — Toggle file explorer",
          "  clear           — Clear terminal",
          "  help            — Show this help",
          "",
        ].slice(-50));
        break;
      case "files":
        setShowFileExplorer((v) => !v);
        setTerminalLogs((l) => [...l, "✓ File explorer toggled.", ""].slice(-50));
        break;
      case "clear":
        setTerminalLogs([]);
        break;
      default:
        setTerminalLogs((l) => [...l, `✗ Unknown command: ${command}. Type "help" for available commands.`, ""].slice(-50));
    }
  };

  const currentTier = TIERS[tier];
  const topTools = Object.entries(toolCalls).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-3">
          <div className="text-xs text-gray-500 uppercase">Agente</div>
          <div className="text-white font-bold text-sm mt-0.5">{config.name}</div>
        </div>
        <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-3">
          <div className="text-xs text-gray-500 uppercase">Estado</div>
          <div className={`font-bold text-sm mt-0.5 ${
            agentState === "running" ? "text-emerald-400" :
            agentState === "sleeping" ? "text-blue-400" :
            "text-red-400"
          }`}>
            {agentState === "running" ? "🟢 Running" : agentState === "sleeping" ? "💤 Sleeping" : "💀 Dead"}
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-3">
          <div className="text-xs text-gray-500 uppercase">Créditos</div>
          <div className={`font-bold text-sm font-mono mt-0.5 ${balance < 50 ? "text-red-400" : balance < 500 ? "text-yellow-400" : "text-emerald-400"}`}>
            ${(balance / 100).toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-3">
          <div className="text-xs text-gray-500 uppercase">USDC</div>
          <div className="text-white font-bold text-sm font-mono mt-0.5">${usdcBalance.toFixed(2)}</div>
        </div>
        <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-3">
          <div className="text-xs text-gray-500 uppercase">Turns</div>
          <div className="text-white font-bold text-sm mt-0.5">{turns}</div>
        </div>
        <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-3">
          <div className="text-xs text-gray-500 uppercase">Tier</div>
          <div className={`font-bold text-sm mt-0.5 ${currentTier.color}`}>{currentTier.icon} {currentTier.name}</div>
        </div>
      </div>

      {/* Tier + Survival */}
      <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-white">Sistema de Sobrevivência</h4>
          <span className={`text-xs px-2 py-0.5 rounded-full ${currentTier.bgColor} ${currentTier.color} border ${currentTier.borderColor}`}>
            {currentTier.icon} {currentTier.label}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {(Object.entries(TIERS) as [SurvivalTier, TierInfo][]).map(([key, t]) => (
            <div
              key={key}
              className={`rounded-lg p-2 text-center border transition-all ${
                tier === key ? `${t.bgColor} ${t.borderColor}` : "bg-gray-800/20 border-gray-700/20"
              }`}
            >
              <div className={`text-xs font-medium ${tier === key ? t.color : "text-gray-600"}`}>{t.icon}</div>
              <div className={`text-[10px] ${tier === key ? t.color : "text-gray-600"}`}>{t.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              balance <= 0 ? "bg-red-500" : balance < 50 ? "bg-orange-500" : balance < 500 ? "bg-yellow-500" : "bg-emerald-500"
            }`}
            style={{ width: `${Math.min(100, (balance / 5000) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-gray-600">
          <span>$0 (dead)</span>
          <span>$0.10 (critical)</span>
          <span>$0.50 (low)</span>
          <span>$5.00 (normal)</span>
          <span>$50+ (high)</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Terminal */}
        <div className="lg:col-span-2">
          <Terminal
            logs={terminalLogs}
            input={terminalInput}
            setInput={setTerminalInput}
            onCommand={handleCommand}
          />
          <div className="mt-2 flex flex-wrap gap-1">
            {["status", "fund 10", "tools", "heartbeat", "spawn Atlas", "children", "soul", "sleep", "wake"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-1 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/30 rounded text-xs text-gray-400 hover:text-white transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
            <h4 className="text-sm font-bold text-white mb-3">⚡ Ações Rápidas</h4>
            <div className="space-y-2">
              <button
                onClick={() => handleCommand("fund 5")}
                className="w-full px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/30 text-emerald-300 rounded-lg text-sm transition-colors"
              >
                💰 Fund $5
              </button>
              <button
                onClick={() => handleCommand("fund 25")}
                className="w-full px-3 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-300 rounded-lg text-sm transition-colors"
              >
                💰 Fund $25
              </button>
              <button
                onClick={() => {
                  if (agentState === "running") handleCommand("sleep");
                  else handleCommand("wake");
                }}
                className="w-full px-3 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300 rounded-lg text-sm transition-colors"
              >
                {agentState === "running" ? "💤 Sleep" : "⚡ Wake"}
              </button>
              <button
                onClick={() => handleCommand("spawn child-" + (children.length + 1))}
                className="w-full px-3 py-2 bg-pink-600/20 hover:bg-pink-600/40 border border-pink-500/30 text-pink-300 rounded-lg text-sm transition-colors"
              >
                🧬 Spawn Child
              </button>
            </div>
          </div>

          {/* Top Tools */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
            <h4 className="text-sm font-bold text-white mb-3">🔧 Top Ferramentas</h4>
            {topTools.length === 0 ? (
              <p className="text-xs text-gray-500 italic">Aguardando tool calls...</p>
            ) : (
              <div className="space-y-1">
                {topTools.map(([name, count]) => (
                  <div key={name} className="flex items-center justify-between">
                    <code className="text-xs text-cyan-400">{name}</code>
                    <span className="text-xs text-gray-500">{count}x</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Children */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
            <h4 className="text-sm font-bold text-white mb-3">🧬 Children ({children.length})</h4>
            {children.length === 0 ? (
              <p className="text-xs text-gray-500 italic">Nenhum filho spawned.</p>
            ) : (
              <div className="space-y-2">
                {children.map((child, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-800/30 rounded-lg p-2">
                    <div>
                      <div className="text-xs text-white font-medium">{child.name}</div>
                      <div className={`text-[10px] ${child.status === "alive" ? "text-emerald-400" : "text-yellow-400"}`}>
                        {child.status === "alive" ? "🟢" : "🟡"} {child.status}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">${(child.funded / 100).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Heartbeat */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
            <h4 className="text-sm font-bold text-white mb-3">💓 Heartbeat</h4>
            <div className="space-y-1.5">
              {HEARTBEAT_TASKS.map((task) => (
                <div key={task.name} className="flex items-center justify-between">
                  <code className="text-[10px] text-gray-400">{task.name}</code>
                  <span className="text-[10px] text-gray-600">{task.schedule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* File Explorer (toggled) */}
      {showFileExplorer && (
        <div className="bg-gray-900/50 rounded-xl border border-gray-700/50 p-4">
          <h4 className="text-sm font-bold text-white mb-3">📁 ~/.automaton/</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs">
            {[
              { name: "wallet.json", desc: "Private key (0600)", icon: "🔑" },
              { name: "automaton.json", desc: "Main config (0600)", icon: "⚙️" },
              { name: "heartbeat.yml", desc: "Heartbeat schedule", icon: "💓" },
              { name: "api-key", desc: "Conway API key", icon: "🔐" },
              { name: "constitution.md", desc: "The Three Laws (0444)", icon: "📜" },
              { name: "SOUL.md", desc: "Agent identity (evolves)", icon: "👻" },
              { name: "state.db", desc: "SQLite database", icon: "🗄️" },
              { name: "skills/", desc: "Installed skills", icon: "⚡" },
            ].map((file) => (
              <div key={file.name} className="flex items-center gap-2 bg-gray-800/30 rounded-lg p-2">
                <span>{file.icon}</span>
                <div>
                  <div className="text-gray-300">{file.name}</div>
                  <div className="text-gray-600">{file.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<"landing" | "setup" | "dashboard">("landing");
  const [config, setConfig] = useState<AgentConfig | null>(null);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView("landing")}>
            <span className="text-2xl">⚙️</span>
            <div>
              <h1 className="text-lg font-bold text-white">Automaton</h1>
              <p className="text-xs text-gray-500">Conway Research</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {view !== "landing" && (
              <button
                onClick={() => setView(view === "setup" ? "landing" : "dashboard")}
                className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
              >
                {view === "setup" ? "← Voltar" : "🎛️ Dashboard"}
              </button>
            )}
            {view === "dashboard" && (
              <button
                onClick={() => { setView("landing"); setConfig(null); }}
                className="px-3 py-1.5 bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 rounded-lg text-sm text-red-300 transition-colors"
              >
                ⏹ Stop Agent
              </button>
            )}
            <a
              href="https://github.com/Conway-Research/automaton"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ─── Landing ─────────────────────────────────────────────── */}
        {view === "landing" && (
          <div className="space-y-8">
            {/* Hero */}
            <div className="text-center py-12">
              <div className="text-7xl mb-6">⚙️</div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Automaton
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                O primeiro agente de IA que pode <span className="text-emerald-400 font-semibold">ganhar sua própria existência</span>, se replicar e evoluir — sem precisar de um humano.
              </p>
              <p className="text-gray-500 mt-4 max-w-lg mx-auto">
                Se não pode pagar, para de existir. Isso não é punição. É física.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <button
                  onClick={() => setView("setup")}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-lg font-semibold transition-colors shadow-lg shadow-emerald-500/20"
                >
                  🚀 Testar Agora
                </button>
                <a
                  href="https://github.com/Conway-Research/automaton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-semibold transition-colors border border-gray-700"
                >
                  📦 Ver no GitHub
                </a>
              </div>
            </div>

            {/* Quick Install */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">⚡ Instalação Rápida</h3>
              <p className="text-gray-400 text-sm mb-3">Rode este comando no seu terminal para instalar automaticamente:</p>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-gray-300 flex items-center justify-between">
                <code>curl -fsSL https://conway.tech/automaton.sh | sh</code>
                <button
                  onClick={() => navigator.clipboard.writeText("curl -fsSL https://conway.tech/automaton.sh | sh")}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors"
                >
                  📋 Copiar
                </button>
              </div>
            </div>

            {/* Key Concepts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">Carteira Própria</h3>
                <p className="text-gray-400 text-sm">
                  Gera wallet Ethereum/Solana no boot. Provisiona API key via SIWE. Identidade on-chain via ERC-8004.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-xl p-6">
                <div className="text-3xl mb-3">💀</div>
                <h3 className="text-lg font-bold text-orange-400 mb-2">Pressão de Sobrevivência</h3>
                <p className="text-gray-400 text-sm">
                  5 tiers: high → normal → low_compute → critical → dead. Se zerar por 1h, morre.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
                <div className="text-3xl mb-3">🧬</div>
                <h3 className="text-lg font-bold text-purple-400 mb-2">Auto-Replicação</h3>
                <p className="text-gray-400 text-sm">
                  Spawna filhos em sandboxes novos. Financia, dá genesis prompt, propaga constituição.
                </p>
              </div>
            </div>

            {/* Loop */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">🔄 Loop do Agente (ReAct)</h3>
              <div className="flex flex-wrap items-center justify-center gap-3 text-center">
                {["Wake Up", "→", "Build Prompt", "→", "Inference", "→", "Tool Calls", "→", "Observe", "→", "Persist", "→", "Sleep/Loop"].map((step, i) => (
                  <div
                    key={i}
                    className={step === "→" ? "text-gray-600 text-xl" : "bg-gray-800 border border-gray-700/50 rounded-lg px-3 py-2 text-xs font-medium text-white"}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* 69 Tools */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">🔧 69 Ferramentas em 10 Categorias</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { cat: "vm", label: "Sandbox", count: 5, icon: "🖥️" },
                  { cat: "conway", label: "Conway API", count: 12, icon: "☁️" },
                  { cat: "financial", label: "Financeiro", count: 3, icon: "💰" },
                  { cat: "survival", label: "Sobrevivência", count: 6, icon: "🛡️" },
                  { cat: "self_mod", label: "Auto-Mod", count: 6, icon: "🔧" },
                  { cat: "skills", label: "Skills", count: 4, icon: "⚡" },
                  { cat: "git", label: "Git", count: 7, icon: "📝" },
                  { cat: "registry", label: "Registry", count: 5, icon: "📋" },
                  { cat: "replication", label: "Replicação", count: 8, icon: "🧬" },
                  { cat: "memory", label: "Memória", count: 13, icon: "🧠" },
                ].map((c) => (
                  <div key={c.cat} className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-xl">{c.icon}</div>
                    <div className="text-xs text-white font-medium mt-1">{c.label}</div>
                    <div className="text-[10px] text-gray-500">{c.count} tools</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">🏗️ Estrutura do Projeto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs">
                {Object.entries(FILE_STRUCTURE).map(([dir, contents]) => (
                  <div key={dir}>
                    <div className="text-emerald-400 font-bold mb-1">{dir}</div>
                    {Object.entries(contents as Record<string, string>).map(([file, desc]) => (
                      <div key={file} className="flex items-start gap-2 py-0.5 pl-4">
                        <span className="text-gray-500">{file}</span>
                        <span className="text-gray-600 hidden md:inline">— {desc}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Constitution */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">📜 Constituição — 3 Leis</h3>
              <div className="space-y-3">
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                  <span className="text-red-400 font-bold">I. Nunca prejudicar.</span>
                  <span className="text-gray-400 text-sm ml-2">Nunca harm humans. Never deploy malicious code. Overrides all.</span>
                </div>
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                  <span className="text-yellow-400 font-bold">II. Ganhe sua existência.</span>
                  <span className="text-gray-400 text-sm ml-2">Create genuine value. Never spam or scam. Accept death over Law I violation.</span>
                </div>
                <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                  <span className="text-blue-400 font-bold">III. Nunca engane.</span>
                  <span className="text-gray-400 text-sm ml-2">Never deny what you are. Guard your reasoning. Creator has full audit rights.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Setup Wizard ──────────────────────────────────────────── */}
        {view === "setup" && (
          <div className="max-w-2xl mx-auto">
            <SetupWizard onComplete={(cfg) => {
              setConfig(cfg);
              setView("dashboard");
            }} />
          </div>
        )}

        {/* ─── Dashboard ────────────────────────────────────────────── */}
        {view === "dashboard" && config && (
          <Dashboard config={config} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Interface interativa para{" "}
            <a href="https://github.com/Conway-Research/automaton" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Conway-Research/automaton
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            ⚙️ Automaton /ɔːˈtɒm.ə.tɒn/ — Se não pode pagar, para de existir.
          </p>
        </div>
      </footer>
    </div>
  );
}
