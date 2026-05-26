# Autonomous Market Monitor (`autonomous-market-monitor`)

A production-ready, event-driven AI data pipeline that automatically tracks industry competitors, processes unstructured news/RSS data using LLMs, extracts clean structured insights, and routes critical updates to team workspaces.

This project demonstrates the hands-on orchestration of large language models (LLMs) within resilient enterprise automation workflows using **n8n** and **Claude (Anthropic API)**.

---

## 🚀 Overview & Architecture

Instead of relying on manual searching or brittle scraping tools, this project establishes a reliable, decoupled system that handles data extraction, AI processing, structured schema enforcement, and multi-channel alerting.
```text
[Trigger: RSS Feed / Webhook / Google Sheet]
│
▼
┌────────────────────────────────────────────────────────┐
│ n8n Automation Engine (Self-Hosted via Docker)         │
│                                                        │
│  1. Ingest raw text or incoming payload data           │
│  2. Inject data into an isolated Prompt Template       │
│  3. Call Claude API (Advanced AI Agent Node)           │
│  4. Validate & parse incoming Structured JSON          │
└────────────────────────────────────────────────────────┘
│
▼
┌─────────────────┴─────────────────┐
▼                                   ▼
[Action 1: Log to Airtable]     [Action 2: Alert Slack Team]
(Structured Data Ledger)        (If Actionable is TRUE)

```

### Key Highlights Evaluated by Hiring Managers:
- **No-Fluff LLM Integration:** Uses Claude to return deterministic, structural data payloads (`JSON`) instead of conversational text.
- **Production Error Resiliency:** Configured with retry logic for API rate limits (`429`) and connection timeouts.
- **Enterprise Tooling:** Built using self-hosted orchestration workflows mimicking multi-thousand-dollar cloud infrastructures at zero cost.

---

## 🛠️ Tech Stack & Financials

This workflow is optimized for production-grade performance while running completely within **free tiers** or self-hosted instances.

| Component | Technology | Cost (Testing/Dev) | Production Purpose |
| :--- | :--- | :--- | :--- |
| **Workflow Engine** | n8n (Community Edition) | `$0.00` (Self-Hosted) | Event-driven orchestration, node management, Webhooks |
| **LLM Engine** | Claude 3.5 Haiku / Sonnet | `$0.00` (`$5.00` Free Trial) | Text evaluation, business intelligence extraction |
| **Database** | Airtable | `$0.00` (Free Tier) | Structured, relation-ready historical data ledger |
| **Alerting** | Slack / Discord | `$0.00` (Sandbox Server) | Operational visibility and urgent team notifications |

---

## 📋 Features & Implementation Details

### 1. The Strict JSON Schema Prompt
To ensure that the downstream tools (Airtable and Slack) don't crash from inconsistent text formatting, Claude is constrained by a strict System Prompt:

```text
You are a specialized business intelligence agent. Analyze the provided text and output ONLY a valid JSON object. 
Do not include markdown blocks like ```json, do not write preambles, and do not include postscript text.

Required Schema:
{
  "competitor_name": "string or 'Unknown'",
  "impact_level": "High" | "Medium" | "Low",
  "summary_one_sentence": "string",
  "action_required": true | false,
  "recommended_response": "string"
}
```
### 2. Event Routing via n8n Business Logic
The n8n workflow parses the stringified output directly into variable objects:
- **Every item** is logged seamlessly to a relational database ledger (Airtable).
- **Conditional branching ("IF" node)** scans the `action_required` boolean. If `true`, a styled Slack message block is fired immediately to warn the product/sales team.

---

## ⚙️ Local Setup Instructions

Follow these instructions to run this entire pipeline on your machine completely free.

### Prerequisites
- Install Docker Desktop ([https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/))
- An Anthropic Developer Account (Get free $5 credits at console.anthropic.com)

### Step 1: Spin Up Self-Hosted n8n
Run the following command in your terminal to start an isolated, persistent instance of n8n on your computer:
```bash
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
```
Navigate to http://localhost:5678 in your browser to access your local workflow UI.

### Step 2: Configure the Credentials
1 In n8n, click on Credentials -> Add Credential.
2 Select Anthropic API and paste your API key generated from the Anthropic Console.
3 (Optional) Repeat the step for your Slack (Webhook) or Airtable Token depending on your endpoint.

### Step 3: Import the Workflow
1 Download the workflow.json file from this repository.
2 In your n8n canvas, click the top-right menu icon and click Import from File.
3 Hit Execute Workflow to test an incoming payload dummy run.

---

## 🎯 Production Takeaways (For ID)
When discussing this project with prospective engineering teams, emphasize these operational considerations:
* **Cost Efficiency:** Using claude-3-5-haiku keeps processing costs under $0.002 per document run, making it immensely viable at massive throughput scales.
* **Schema Validation:** Handled edge cases where LLMs occasionally return broken JSON text strings by implementing fallback parsing logic inside an n8n Code/Javascript node.
* **Modularity:** The trigger can be hot-swapped from an RSS feed to a Webhook URL, a PostgreSQL database trigger, or a Kafka queue without altering the underlying Claude orchestration layout.
---
