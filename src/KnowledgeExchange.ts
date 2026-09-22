// ─── Knowledge Exchange System ────────────────────────────────────────
// Sistema de memória coletiva para aprendizado multi-agente

export interface DecisionCycle {
  id: string;
  agentId: string;
  timestamp: number;
  balance: number; // créditos em cents
  action: string;
  result: "success" | "failure" | "neutral";
  valueGenerated: number; // USDC gerado em cents
  reasoning: string;
  context: {
    tier: string;
    turnsAlive: number;
    childrenCount: number;
  };
}

export interface Instinct {
  id: string;
  pattern: string;
  heuristic: string;
  confidence: number; // 0-100
  sampleSize: number;
  successRate: number; // 0-100
  createdAt: number;
  lastValidated: number;
}

export interface KnowledgeExchange {
  decisions: DecisionCycle[];
  instincts: Instinct[];
  lastDistilled: number;
}

// ─── Knowledge Exchange Manager ───────────────────────────────────────
class KnowledgeExchangeManager {
  private storage: KnowledgeExchange;

  constructor() {
    const stored = localStorage.getItem("knowledge_exchange");
    this.storage = stored
      ? JSON.parse(stored)
      : {
          decisions: [],
          instincts: [],
          lastDistilled: 0,
        };
  }

  // Registra um ciclo de decisão
  recordDecision(cycle: Omit<DecisionCycle, "id" | "timestamp">): DecisionCycle {
    const newCycle: DecisionCycle = {
      ...cycle,
      id: `cycle-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
    };

    this.storage.decisions.push(newCycle);
    
    // Manter apenas os últimos 500 ciclos
    if (this.storage.decisions.length > 500) {
      this.storage.decisions = this.storage.decisions.slice(-500);
    }

    this.save();
    return newCycle;
  }

  // Destila instintos a partir das decisões
  distillInstincts(): Instinct[] {
    const newInstincts: Instinct[] = [];
    const decisions = this.storage.decisions;

    // Agrupa decisões por contexto
    const contexts = this.groupByContext(decisions);

    // Para cada contexto, analisa padrões de sucesso
    for (const [contextKey, contextDecisions] of Object.entries(contexts)) {
      const successful = contextDecisions.filter((d) => d.result === "success");
      
      if (successful.length >= 3) {
        // Calcula taxa de sucesso
        const successRate = (successful.length / contextDecisions.length) * 100;
        
        // Se taxa de sucesso > 60%, gera instinto
        if (successRate >= 60) {
          const actions = successful.map((d) => d.action);
          const mostCommon = this.getMostCommon(actions);
          
          const instinct: Instinct = {
            id: `instinct-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            pattern: contextKey,
            heuristic: this.generateHeuristic(contextKey, mostCommon, successRate),
            confidence: Math.min(95, successRate),
            sampleSize: successful.length,
            successRate,
            createdAt: Date.now(),
            lastValidated: Date.now(),
          };

          newInstincts.push(instinct);
        }
      }
    }

    // Atualiza instintos existentes
    this.storage.instincts = this.mergeInstincts(this.storage.instincts, newInstincts);
    this.storage.lastDistilled = Date.now();
    this.save();

    return newInstincts;
  }

  // Agrupa decisões por contexto
  private groupByContext(decisions: DecisionCycle[]): Record<string, DecisionCycle[]> {
    const groups: Record<string, DecisionCycle[]> = {};

    for (const decision of decisions) {
      const contextKey = this.generateContextKey(decision);
      if (!groups[contextKey]) {
        groups[contextKey] = [];
      }
      groups[contextKey].push(decision);
    }

    return groups;
  }

  // Gera chave de contexto baseada no estado do agente
  private generateContextKey(decision: DecisionCycle): string {
    const parts: string[] = [];

    // Saldo
    if (decision.balance < 100) parts.push("saldo_critico");
    else if (decision.balance < 500) parts.push("saldo_baixo");
    else if (decision.balance < 1000) parts.push("saldo_normal");
    else parts.push("saldo_alto");

    // Tier
    parts.push(decision.context.tier);

    // Tempo de vida
    if (decision.context.turnsAlive < 10) parts.push("novo");
    else if (decision.context.turnsAlive < 50) parts.push("jovem");
    else parts.push("experiente");

    return parts.join("_");
  }

  // Gera heurística legível
  private generateHeuristic(context: string, action: string, successRate: number): string {
    const contextParts = context.split("_");
    const conditions: string[] = [];

    if (contextParts.includes("saldo_critico")) conditions.push("saldo < $1");
    else if (contextParts.includes("saldo_baixo")) conditions.push("saldo < $5");
    else if (contextParts.includes("saldo_normal")) conditions.push("saldo < $10");
    else conditions.push("saldo > $10");

    if (contextParts.includes("novo")) conditions.push("turns < 10");
    else if (contextParts.includes("jovem")) conditions.push("turns < 50");
    else conditions.push("turns > 50");

    const conditionStr = conditions.join(" E ");
    
    return `QUANDO ${conditionStr}, PRIORIZAR ${action} (sucesso: ${successRate.toFixed(0)}%)`;
  }

  // Encontra ação mais comum
  private getMostCommon(arr: string[]): string {
    const counts: Record<string, number> = {};
    for (const item of arr) {
      counts[item] = (counts[item] || 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  // Mescla instintos novos com existentes
  private mergeInstincts(existing: Instinct[], newOnes: Instinct[]): Instinct[] {
    const merged = [...existing];

    for (const newInstinct of newOnes) {
      const existingIdx = merged.findIndex((i) => i.pattern === newInstinct.pattern);
      
      if (existingIdx >= 0) {
        // Atualiza instinto existente se o novo for melhor
        if (newInstinct.successRate > merged[existingIdx].successRate) {
          merged[existingIdx] = {
            ...newInstinct,
            createdAt: merged[existingIdx].createdAt,
          };
        }
      } else {
        // Adiciona novo instinto
        merged.push(newInstinct);
      }
    }

    // Mantém apenas os 50 melhores instintos
    return merged
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 50);
  }

  // Retorna todos os instintos
  getInstincts(): Instinct[] {
    return this.storage.instincts;
  }

  // Retorna decisões recentes
  getRecentDecisions(limit: number = 50): DecisionCycle[] {
    return this.storage.decisions.slice(-limit);
  }

  // Retorna estatísticas
  getStats() {
    const decisions = this.storage.decisions;
    const successful = decisions.filter((d) => d.result === "success");
    const totalValue = decisions.reduce((sum, d) => sum + d.valueGenerated, 0);

    return {
      totalDecisions: decisions.length,
      successfulDecisions: successful.length,
      successRate: decisions.length > 0 ? (successful.length / decisions.length) * 100 : 0,
      totalValueGenerated: totalValue,
      instinctsCount: this.storage.instincts.length,
      lastDistilled: this.storage.lastDistilled,
    };
  }

  // Limpa dados
  clear() {
    this.storage = {
      decisions: [],
      instincts: [],
      lastDistilled: 0,
    };
    this.save();
  }

  // Salva no localStorage
  private save() {
    localStorage.setItem("knowledge_exchange", JSON.stringify(this.storage));
  }
}

// Exporta instância singleton
export const knowledgeExchange = new KnowledgeExchangeManager();
