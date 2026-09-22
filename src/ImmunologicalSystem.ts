// ─── Sistema Imunológico Econômico ─────────────────────────────────────
// Implementação dos 4 pilares: Shadow Mode, EDV, x402, Fast/Slow Memory

// ═══════════════════════════════════════════════════════════════════════
// PILAR 1: SHADOW MODE — Aprender Sem Arriscar Capital
// ═══════════════════════════════════════════════════════════════════════

export type SignalConfidence = "high" | "exploratory";

export interface ShadowSignal {
  id: string;
  timestamp: number;
  agentId: string;
  action: string;
  confidence: SignalConfidence;
  context: {
    balance: number;
    tier: string;
    marketConditions?: any;
  };
  executed: boolean;
  simulated: boolean;
  actualResult?: {
    cost: number;
    revenue: number;
    success: boolean;
  };
  simulatedResult?: {
    estimatedCost: number;
    estimatedRevenue: number;
    estimatedSuccess: boolean;
    counterfactualData: any;
  };
}

export class ShadowModeManager {
  private signals: ShadowSignal[] = [];
  private readonly SHADOW_COST_MULTIPLIER = 0; // Zero custo em shadow mode

  // Classifica sinal baseado em confiança
  classifySignal(
    action: string,
    balance: number,
    historicalSuccessRate: number,
    tier: string
  ): SignalConfidence {
    // Alta confiança se:
    // - Saldo > $5
    // - Taxa de sucesso histórica > 70%
    // - Tier = high ou normal
    // - Ação já foi testada com sucesso antes
    
    if (balance < 100) return "exploratory"; // Saldo crítico
    if (historicalSuccessRate < 0.6) return "exploratory"; // Baixa taxa de sucesso
    if (tier === "critical" || tier === "dead") return "exploratory"; // Tier crítico
    
    return "high";
  }

  // Executa em shadow mode (simulação zero-custo)
  executeInShadow(signal: Omit<ShadowSignal, "id" | "timestamp" | "simulated" | "executed">): ShadowSignal {
    const shadowSignal: ShadowSignal = {
      ...signal,
      id: `shadow-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
      executed: false,
      simulated: true,
      simulatedResult: this.simulateOutcome(signal.action, signal.context),
    };

    this.signals.push(shadowSignal);
    
    // Manter apenas últimos 500 sinais
    if (this.signals.length > 500) {
      this.signals = this.signals.slice(-500);
    }

    return shadowSignal;
  }

  // Executa com capital real
  executeWithCapital(signal: Omit<ShadowSignal, "id" | "timestamp" | "simulated" | "executed">): ShadowSignal {
    const realSignal: ShadowSignal = {
      ...signal,
      id: `real-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
      executed: true,
      simulated: false,
    };

    this.signals.push(realSignal);
    return realSignal;
  }

  // Simula resultado (contrafactual)
  private simulateOutcome(action: string, context: any): ShadowSignal["simulatedResult"] {
    // Simulação baseada em padrões históricos
    // Em produção, isso usaria dados de mercado reais
    
    const baseSuccessRate = 0.65; // 65% base
    const balanceFactor = Math.min(1, context.balance / 1000); // Fator de saldo
    const estimatedSuccess = Math.random() < (baseSuccessRate * balanceFactor);
    
    return {
      estimatedCost: Math.floor(Math.random() * 50) + 10, // $0.10 - $0.60
      estimatedRevenue: estimatedSuccess ? Math.floor(Math.random() * 200) + 50 : 0,
      estimatedSuccess,
      counterfactualData: {
        marketConditions: "simulated",
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        similarHistoricalCases: Math.floor(Math.random() * 20) + 5,
      },
    };
  }

  // Compara resultados reais vs simulados
  getCounterfactualAnalysis(): {
    totalSignals: number;
    highConfidenceExecuted: number;
    exploratorySimulated: number;
    accuracyRate: number;
    costSaved: number;
  } {
    const executed = this.signals.filter(s => s.executed);
    const simulated = this.signals.filter(s => s.simulated);
    
    // Calcula precisão das simulações
    let correctPredictions = 0;
    let totalComparisons = 0;

    for (const sim of simulated) {
      const similarReal = executed.find(r => 
        r.action === sim.action && 
        Math.abs(r.context.balance - sim.context.balance) < 200
      );
      
      if (similarReal && sim.simulatedResult && similarReal.actualResult) {
        totalComparisons++;
        if (sim.simulatedResult.estimatedSuccess === similarReal.actualResult.success) {
          correctPredictions++;
        }
      }
    }

    const accuracyRate = totalComparisons > 0 ? (correctPredictions / totalComparisons) * 100 : 0;
    
    // Custo economizado por não executar exploratórios
    const costSaved = simulated.reduce((sum, s) => {
      return sum + (s.simulatedResult?.estimatedCost || 0);
    }, 0);

    return {
      totalSignals: this.signals.length,
      highConfidenceExecuted: executed.filter(s => s.confidence === "high").length,
      exploratorySimulated: simulated.length,
      accuracyRate,
      costSaved,
    };
  }

  getSignals(): ShadowSignal[] {
    return this.signals;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// PILAR 2: EDV PIPELINE — Execute-Distill-Verify
// ═══════════════════════════════════════════════════════════════════════

export type AgentRole = "executor" | "distiller" | "verifier";

export interface EDVTrajectory {
  id: string;
  agentId: string;
  role: AgentRole;
  timestamp: number;
  actions: Array<{
    action: string;
    result: "success" | "failure" | "neutral";
    value: number;
  }>;
  totalValue: number;
  successRate: number;
}

export interface DistilledExperience {
  id: string;
  pattern: string;
  heuristic: string;
  sourceTrajectories: string[];
  confidence: number;
  verified: boolean;
  verificationConsensus?: number; // 0-100
  approvedBy: string[]; // IDs dos verificadores
}

export class EDVPipeline {
  private trajectories: EDVTrajectory[] = [];
  private experiences: DistilledExperience[] = [];
  private sharedMemory: DistilledExperience[] = [];
  private privateMemory: DistilledExperience[] = [];

  // EXECUTE: Registra trajetória de executor
  recordTrajectory(trajectory: Omit<EDVTrajectory, "id" | "timestamp">): EDVTrajectory {
    const newTrajectory: EDVTrajectory = {
      ...trajectory,
      id: `traj-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
    };

    this.trajectories.push(newTrajectory);
    
    // Manter últimas 200 trajetórias
    if (this.trajectories.length > 200) {
      this.trajectories = this.trajectories.slice(-200);
    }

    return newTrajectory;
  }

  // DISTILL: Agente destilador extrai padrões
  distillExperiences(distillerId: string): DistilledExperience[] {
    const newExperiences: DistilledExperience[] = [];
    
    // Agrupa trajetórias por padrão de ação
    const actionPatterns = this.groupByActionPattern(this.trajectories);
    
    for (const [pattern, trajectories] of Object.entries(actionPatterns)) {
      if (trajectories.length < 3) continue; // Mínimo 3 trajetórias
      
      const successRate = trajectories.reduce((sum, t) => sum + t.successRate, 0) / trajectories.length;
      
      if (successRate >= 0.6) { // 60% de sucesso
        const experience: DistilledExperience = {
          id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          pattern,
          heuristic: this.generateHeuristic(pattern, successRate),
          sourceTrajectories: trajectories.map(t => t.id),
          confidence: Math.floor(successRate * 100),
          verified: false,
          approvedBy: [],
        };
        
        newExperiences.push(experience);
      }
    }

    this.experiences.push(...newExperiences);
    return newExperiences;
  }

  // VERIFY: Consenso entre verificadores
  verifyExperience(experienceId: string, verifierIds: string[]): {
    approved: boolean;
    consensus: number;
    destination: "shared" | "private" | "discarded";
  } {
    const experience = this.experiences.find(e => e.id === experienceId);
    if (!experience) {
      return { approved: false, consensus: 0, destination: "discarded" };
    }

    // Simula votação dos verificadores
    const votes = verifierIds.map(() => Math.random() > 0.3); // 70% chance de aprovar
    const approvalRate = votes.filter(v => v).length / votes.length;
    const consensus = approvalRate * 100;

    experience.verificationConsensus = consensus;
    experience.approvedBy = verifierIds.filter((_, i) => votes[i]);

    let destination: "shared" | "private" | "discarded";
    
    if (consensus >= 80) {
      // Unânime ou quase: memória compartilhada
      destination = "shared";
      this.sharedMemory.push(experience);
      experience.verified = true;
    } else if (consensus >= 50) {
      // Parcial: memória privada
      destination = "private";
      this.privateMemory.push(experience);
    } else {
      // Rejeitado
      destination = "discarded";
    }

    return { approved: consensus >= 50, consensus, destination };
  }

  // Agrupa trajetórias por padrão
  private groupByActionPattern(trajectories: EDVTrajectory[]): Record<string, EDVTrajectory[]> {
    const groups: Record<string, EDVTrajectory[]> = {};
    
    for (const traj of trajectories) {
      const pattern = traj.actions.map(a => a.action).join(" → ");
      if (!groups[pattern]) {
        groups[pattern] = [];
      }
      groups[pattern].push(traj);
    }
    
    return groups;
  }

  // Gera heurística legível
  private generateHeuristic(pattern: string, successRate: number): string {
    return `QUANDO executar "${pattern}", taxa de sucesso esperada: ${(successRate * 100).toFixed(0)}%`;
  }

  getSharedMemory(): DistilledExperience[] {
    return this.sharedMemory;
  }

  getPrivateMemory(): DistilledExperience[] {
    return this.privateMemory;
  }

  getStats() {
    return {
      totalTrajectories: this.trajectories.length,
      totalExperiences: this.experiences.length,
      sharedMemoryCount: this.sharedMemory.length,
      privateMemoryCount: this.privateMemory.length,
      averageConsensus: this.experiences.length > 0
        ? this.experiences.reduce((sum, e) => sum + (e.verificationConsensus || 0), 0) / this.experiences.length
        : 0,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════
// PILAR 3: x402 REVENUE — Micropagamentos
// ═══════════════════════════════════════════════════════════════════════

export interface X402Service {
  id: string;
  name: string;
  endpoint: string;
  pricePerCall: number; // em cents
  totalCalls: number;
  totalRevenue: number; // em cents
  margin: number; // 0-100
}

export class X402RevenueManager {
  private services: X402Service[] = [];
  private readonly MIN_MARGIN = 0.3; // 30% margem mínima

  // Registra serviço publicado
  publishService(service: Omit<X402Service, "id" | "totalCalls" | "totalRevenue">): X402Service {
    const newService: X402Service = {
      ...service,
      id: `svc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      totalCalls: 0,
      totalRevenue: 0,
    };

    this.services.push(newService);
    return newService;
  }

  // Simula chamada de serviço
  simulateServiceCall(serviceId: string): {
    success: boolean;
    revenue: number;
    cost: number;
    profit: number;
  } {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) {
      return { success: false, revenue: 0, cost: 0, profit: 0 };
    }

    // Simula chamada
    const success = Math.random() > 0.1; // 90% de sucesso
    const revenue = success ? service.pricePerCall : 0;
    const cost = Math.floor(service.pricePerCall * 0.5); // 50% do preço é custo
    const profit = revenue - cost;

    // Verifica margem mínima
    if (profit / revenue < this.MIN_MARGIN && success) {
      console.warn(`Serviço ${service.name} abaixo da margem mínima`);
    }

    // Atualiza estatísticas
    if (success) {
      service.totalCalls++;
      service.totalRevenue += revenue;
    }

    return { success, revenue, cost, profit };
  }

  // Calcula precificação ótima
  optimizePricing(serviceId: string, demandFactor: number): number {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) return 0;

    // Ajusta preço baseado na demanda
    const basePrice = service.pricePerCall;
    const adjustedPrice = Math.floor(basePrice * (1 + demandFactor * 0.2));
    
    // Garante margem mínima
    const minPrice = Math.floor(service.pricePerCall / this.MIN_MARGIN);
    
    return Math.max(adjustedPrice, minPrice);
  }

  getServices(): X402Service[] {
    return this.services;
  }

  getTotalRevenue(): number {
    return this.services.reduce((sum, s) => sum + s.totalRevenue, 0);
  }

  getStats() {
    const totalCalls = this.services.reduce((sum, s) => sum + s.totalCalls, 0);
    const totalRevenue = this.getTotalRevenue();
    const avgPricePerCall = totalCalls > 0 ? totalRevenue / totalCalls : 0;

    return {
      totalServices: this.services.length,
      totalCalls,
      totalRevenue,
      avgPricePerCall,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════
// PILAR 4: FAST MEMORY / SLOW WEIGHTS — Aprendizado em Duas Velocidades
// ═══════════════════════════════════════════════════════════════════════

export interface FastMemoryUpdate {
  id: string;
  timestamp: number;
  type: "instinct" | "heuristic" | "skill";
  content: string;
  confidence: number;
  validated: boolean;
}

export interface SlowWeightUpdate {
  id: string;
  timestamp: number;
  modelVersion: string;
  trainingData: string[]; // IDs de trajetórias verificadas
  validationScore: number;
  deployed: boolean;
  gatePassed: boolean;
}

export class DualSpeedLearningManager {
  private fastMemory: FastMemoryUpdate[] = [];
  private slowWeights: SlowWeightUpdate[] = [];
  private frozenDecisions: any[] = []; // Para validação

  // FAST MEMORY: Atualizações contínuas
  updateFastMemory(update: Omit<FastMemoryUpdate, "id" | "timestamp" | "validated">): FastMemoryUpdate {
    const newUpdate: FastMemoryUpdate = {
      ...update,
      id: `fast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
      validated: false,
    };

    this.fastMemory.push(newUpdate);
    
    // Manter últimas 500 atualizações
    if (this.fastMemory.length > 500) {
      this.fastMemory = this.fastMemory.slice(-500);
    }

    return newUpdate;
  }

  // SLOW WEIGHTS: Atualizações raras com gate de validação
  proposeSlowWeightUpdate(
    modelVersion: string,
    trainingDataIds: string[]
  ): SlowWeightUpdate {
    const update: SlowWeightUpdate = {
      id: `slow-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
      modelVersion,
      trainingData: trainingDataIds,
      validationScore: 0,
      deployed: false,
      gatePassed: false,
    };

    // Gate de validação: testa novo modelo contra decisões congeladas
    update.validationScore = this.validateAgainstFrozenDecisions(update);
    update.gatePassed = update.validationScore >= 0.75; // 75% threshold

    if (update.gatePassed) {
      update.deployed = true;
      this.slowWeights.push(update);
      
      // Manter apenas últimos 10 modelos
      if (this.slowWeights.length > 10) {
        this.slowWeights = this.slowWeights.slice(-10);
      }
    }

    return update;
  }

  // Valida novo modelo contra decisões congeladas
  private validateAgainstFrozenDecisions(update: SlowWeightUpdate): number {
    if (this.frozenDecisions.length === 0) {
      return 0.5; // Neutro se não há dados
    }

    // Simula validação (em produção, rodaria o novo modelo)
    const correctPredictions = this.frozenDecisions.filter(() => Math.random() > 0.3).length;
    return correctPredictions / this.frozenDecisions.length;
  }

  // Congela decisões para validação futura
  freezeDecision(decision: any): void {
    this.frozenDecisions.push(decision);
    
    // Manter últimas 100 decisões congeladas
    if (this.frozenDecisions.length > 100) {
      this.frozenDecisions = this.frozenDecisions.slice(-100);
    }
  }

  getFastMemory(): FastMemoryUpdate[] {
    return this.fastMemory;
  }

  getSlowWeights(): SlowWeightUpdate[] {
    return this.slowWeights;
  }

  getStats() {
    return {
      fastMemoryUpdates: this.fastMemory.length,
      slowWeightUpdates: this.slowWeights.length,
      frozenDecisions: this.frozenDecisions.length,
      currentModelVersion: this.slowWeights.length > 0
        ? this.slowWeights[this.slowWeights.length - 1].modelVersion
        : "v1.0",
      lastValidationScore: this.slowWeights.length > 0
        ? this.slowWeights[this.slowWeights.length - 1].validationScore
        : 0,
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════
// EXPORT SINGLETONS
// ═══════════════════════════════════════════════════════════════════════

export const shadowMode = new ShadowModeManager();
export const edvPipeline = new EDVPipeline();
export const x402Revenue = new X402RevenueManager();
export const dualSpeedLearning = new DualSpeedLearningManager();
