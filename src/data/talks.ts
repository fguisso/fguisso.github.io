type TalkResource = {
	label: string;
	url: string;
};

type Talk = {
	event: string;
	tag: string;
	talkTitle: string;
	summary?: string;
	articleSlug?: string;
	slides?: TalkResource;
	video?: TalkResource;
};

export function getTalkPage(lang: 'pt' | 'en') {
	const t = (pt: string, en: string) => lang === 'en' ? en : pt;
	const repoCard = {
		title: 'fguisso/talks',
		description:
			t('Slides versionados com Slidev, publicados automaticamente no GitHub Pages através de uma pipeline GitHub Actions.', 'Slide decks built with Slidev and published automatically to GitHub Pages through a GitHub Actions pipeline.'),
		url: 'https://github.com/fguisso/talks',
	};

	const repoHighlights = [
		t('Slide deck em Markdown com Slidev', 'Markdown-first decks powered by Slidev'),
		t('Deploy contínuo no GitHub Pages', 'Continuous delivery to GitHub Pages'),
		t('Trilhas responsivas para usar até no celular', 'Responsive flows that work even on phones'),
	];

	const talks: Talk[] = [
		{
			event: 'DevOpsDays Natal 2024',
			tag: 'ebpf',
			talkTitle: t('K8s Sob Controle: eBPF e Kubescape para Segurança Total', 'K8s Under Control: eBPF and Kubescape for Total Security'),
			summary:
				t('Eu fiz uma postagem com tudo que foi falado: demos de eBPF, políticas kubescape e o fluxo de observabilidade que aplicamos em produção.', 'I documented every demo from the talk: eBPF captures, Kubescape policies, and the observability pipeline we run in production.'),
			articleSlug: 'ebpf-and-security',
			slides: {
				label: t('Slides PT-BR', 'Slides (PT-BR)'),
				url: 'https://guisso.dev/talks/ebpf-kubescape/',
			},
		},
		{
			event: 'Meetup OWASP Brasília',
			tag: 'threat-modeling',
			talkTitle: 'Threat Modeling Express',
			summary:
				t('Passei por threat modeling hands-on, com fluxos rápidos de STRIDE e catálogos prontos para sair da reunião com histórias de AppSec priorizadas.', 'Hands-on threat modeling with fast STRIDE flows and ready-made catalogs so the team leaves the meeting with prioritized AppSec stories.'),
			articleSlug: 'threat-modeling-intro',
			slides: {
				label: t('Slides PT-BR', 'Slides (PT-BR)'),
				url: 'https://guisso.dev/talks/threat-modeling/',
			},
			video: {
				label: t('Assistir no YouTube', 'Watch on YouTube'),
				url: 'https://youtu.be/3TVmFqaAA1o',
			},
		},
		{
			event: 'Debian Day Natal 2024',
			tag: 'homelab',
			talkTitle: t('Proxmox e Homelab', 'Proxmox and Homelab'),
			summary:
				t('Esta palestra foi total mão na massa: do bare metal ao cluster Proxmox. Se quiser rever cada comando, deixei o passo a passo completo no post.', 'A live, hands-on session: from bare metal to a Proxmox cluster. Every command is written down in the companion post.'),
			articleSlug: 'proxmox-debian-day',
			slides: {
				label: t('Slides', 'Slides (PT-BR)'),
				url: 'https://guisso.dev/talks/homelab-proxmox/',
			},
		},
		{
			event: 'Google IO Extended Natal 2023',
			tag: 'LLM',
			talkTitle: 'OWASP Top 10 LLM Vulnerabilities',
			summary:
				t('Palestra sobre as top 10 vulnerabilidades em LLM para você evitar nos seus projetos de AI e manter inferência sob controle.', 'How to avoid the OWASP Top 10 LLM vulnerabilities in your AI projects and keep inference flows under control.'),
			slides: {
				label: 'Slides',
				url: 'https://guisso.dev/talks/top-10-llm-0.5/',
			},
		},
		{
			event: 'Potiday JS 2023',
			tag: 'appsec',
			talkTitle: t('DevSec - Entendendo e corrigindo vulnerabilidades de Sessão e XSS', 'DevSec - Understanding and fixing Session and XSS vulnerabilities'),
			summary:
				t('A palestra aborda problemas comuns em aplicações JavaScript: vulnerabilidades de sessão e ataques XSS, com técnicas práticas de mitigação.', 'Session bugs and XSS attacks are still common on JS apps. This talk breaks down the flaws and shows practical mitigations.'),
			slides: {
				label: 'Slides',
				url: 'https://guisso.dev/talks/xss-session/',
			},
		},
		{
			event: 'Semana ARATU II',
			tag: 'appsec',
			talkTitle: t('DAST na pipeline', 'DAST inside the pipeline'),
			summary:
				t('Como adaptei scanners DAST para caber nos meus pipelines sem travar deploys, com ajustes de perfil e correlação automática de findings.', 'How I adapted DAST scanners to fit CI/CD without blocking deploys, tuning profiles and correlating findings automatically.'),
			video: {
				label: t('Assistir no YouTube', 'Watch on YouTube'),
				url: 'https://youtu.be/mNvtYrEjaHA',
			},
		},
		{
			event: 'DockerCon 2021 · Sala Brasil',
			tag: 'appsec',
			talkTitle: t('Segurança de imagens e containers direto na pipeline', 'Container security wired into the pipeline'),
			summary:
				t('Compartilhei o fluxo de hardening de imagens e políticas de runtime que implementei em pipelines GitOps para times distribuídos.', 'I shared the container image hardening flow and runtime policies we implemented in GitOps pipelines for distributed teams.'),
			video: {
				label: t('Assistir no YouTube', 'Watch on YouTube'),
				url: 'https://youtu.be/bR9SlnxJI-w',
			},
		},
		{
			event: 'Campus Party Amazônia',
			tag: 'blockchain',
			talkTitle: t('Pagamentos instantâneos com criptomoedas', 'Instant payments with crypto'),
			summary:
				t('Mostrei como montei um stack de pagamentos instantâneos usando carteiras self-hosted, contratos simples e UX acessível.', 'How I assembled an instant-payment stack using self-hosted wallets, simple contracts, and accessible UX.'),
			video: {
				label: t('Assistir no YouTube', 'Watch on YouTube'),
				url: 'https://youtu.be/2HKUgc0LjcI',
			},
		},
	];

	const standaloneSlides: TalkResource[] = [
		{ label: 'Carreira em AppSec', url: 'https://guisso.dev/talks/carreira-appsec/' },
		{ label: 'Software Livre, Comunidade e Soberania', url: 'https://guisso.dev/talks/software-livre/' },
		{ label: 'Segurança em IA', url: 'https://guisso.dev/talks/ai-sec/' },
		{ label: 'Segurança no PyPI', url: 'https://guisso.dev/talks/pip-sec/' },
		{ label: 'CI / CDon’t', url: 'https://guisso.dev/talks/cicdont/' },
		{ label: 'CTF: Capture the Flag', url: 'https://guisso.dev/ctf-slides/build/' },
		{ label: t('Bitcoin Developer para iniciantes', 'Bitcoin Development for Beginners'), url: 'https://guisso.dev/btc-dev-bitconf/' },
		{ label: 'NodeBots + Garoa Dojo Shield', url: 'https://guisso.dev/nodebots-cpbr/' },
	];

	return { repoCard, repoHighlights, talks, standaloneSlides };
}
