import { DOM } from './dom.js';
import { LanguageHandler } from './languageHandler.js';

/**
 * Manages the mind map functionality using vis.js library.
 * It provides a visual, interactive graph of the documentation structure.
 */
export const MindMap = {
    network: null,
    storageKey: 'mindmapNodePositions',

    mindMapData: {
        nodes: [
            { id: 'hub', labelKey: 'page_title', href: '#introduction', group: 'center' },
            { id: 'pillar_setup', labelKey: 'h1_quick_start', href: '#quick-start', group: 'branch' },
            { id: 'pillar_automation', labelKey: 'h1_components', href: '#core-components', group: 'branch' },
            { id: 'pillar_management', labelKey: 'h1_loc_tool_window', href: '#localization-tool-window', group: 'branch' },
            { id: 'pillar_translation', labelKey: 'h1_translation_editor', href: '#translation-editor', group: 'branch' },
            { id: 'pillar_integration', labelKey: 'h1_usage_examples', href: '#usage-examples', group: 'branch' },
            { id: 'pillar_advanced', labelKey: 'h1_extending', href: '#extending-functionality', group: 'branch' },
            { id: 'pillar_notes', labelKey: 'h1_important_notes', href: '#important-notes', group: 'branch' },
            { id: 'pillar_faq', labelKey: 'h1_faq', href: '#faq', group: 'branch' },
            { id: 'setup_install', labelKey: 'h2_installation', href: '#installation', group: 'subnode' },
            { id: 'setup_initial', labelKey: 'h2_initial_setup', href: '#initial-setup', group: 'subnode' },
            { id: 'comp_text', labelKey: 'h2_localizedtext', href: '#localized-text', group: 'subnode' },
            { id: 'comp_asset', labelKey: 'h2_localizedasset', href: '#localized-asset', group: 'subnode' },
            { id: 'comp_prefab', labelKey: 'h2_localizedprefab', href: '#localized-prefab', group: 'subnode' },
            { id: 'comp_uitk', labelKey: 'h2_uitklocalization', href: '#uitk-localization', group: 'subnode' },
            { id: 'comp_dropdown', labelKey: 'h2_localizeddropdown', href: '#localized-dropdown', group: 'subnode' },
            { id: 'comp_behaviour', labelKey: 'h2_localizedbehaviour', href: '#localized-behaviour', group: 'subnode' },
            { id: 'tab_preview', labelKey: 'h2_in_editor_preview', href: '#in-editor-preview', group: 'subnode' },
            { id: 'tab_settings', labelKey: 'h2_tab_settings', href: '#settings-tab', group: 'subnode' },
            { id: 'tab_content', labelKey: 'h2_tab_content', href: '#content-tab', group: 'subnode' },
            { id: 'tab_actions', labelKey: 'h2_tab_actions', href: '#actions-tab', group: 'subnode' },
            { id: 'tab_assets', labelKey: 'h2_tab_assets', href: '#assets-tab', group: 'subnode' },
            { id: 'trans_grouping', labelKey: 'li_editor_1', href: '#translation-editor', group: 'subnode' },
            { id: 'trans_validation', labelKey: 'li_editor_3', href: '#translation-editor', group: 'subnode' },
            { id: 'trans_auto', labelKey: 'li_actions_4', href: '#actions-tab', group: 'subnode' },
            { id: 'integ_components', labelKey: 'h2_example_components', href: '#ready-made-components', group: 'subnode' },
            { id: 'integ_attribute', labelKey: 'h2_example_attribute', href: '#localizable-field-attribute', group: 'subnode' },
            { id: 'integ_function', labelKey: 'h2_example_function', href: '#onlanguagechange-function', group: 'subnode' },
            { id: 'integ_plurals', labelKey: 'h2_example_plurals', href: '#plurals-and-gender', group: 'subnode' },
            { id: 'extend_parser', labelKey: 'h2_custom_parser', href: '#custom-parser', group: 'subnode' },
            { id: 'faq_install', labelKey: 'nav_faq_installation', href: '#faq-installation', group: 'subnode' },
            { id: 'faq_components', labelKey: 'nav_faq_components', href: '#faq-components', group: 'subnode' },
            { id: 'faq_window', labelKey: 'nav_faq_window', href: '#faq-window', group: 'subnode' },
            { id: 'faq_editor', labelKey: 'nav_faq_editor', href: '#faq-editor', group: 'subnode' },
        ],
        edges: [
            { from: 'hub', to: 'pillar_setup' }, { from: 'hub', to: 'pillar_automation' }, { from: 'hub', to: 'pillar_management' }, { from: 'hub', to: 'pillar_translation' }, { from: 'hub', to: 'pillar_integration' }, { from: 'hub', to: 'pillar_advanced' }, { from: 'hub', to: 'pillar_notes' }, { from: 'hub', to: 'pillar_faq' },
            { from: 'pillar_setup', to: 'setup_install' }, { from: 'pillar_setup', to: 'setup_initial' },
            { from: 'pillar_automation', to: 'comp_text' }, { from: 'pillar_automation', to: 'comp_asset' }, { from: 'pillar_automation', to: 'comp_prefab' }, { from: 'pillar_automation', to: 'comp_uitk' }, { from: 'pillar_automation', to: 'comp_dropdown' }, { from: 'pillar_automation', to: 'comp_behaviour' },
            { from: 'pillar_management', to: 'tab_preview' }, { from: 'pillar_management', to: 'tab_settings' }, { from: 'pillar_management', to: 'tab_content' }, { from: 'pillar_management', to: 'tab_actions' }, { from: 'pillar_management', to: 'tab_assets' },
            { from: 'pillar_translation', to: 'trans_grouping' }, { from: 'pillar_translation', to: 'trans_validation' },
            { from: 'pillar_integration', to: 'integ_components' }, { from: 'pillar_integration', to: 'integ_attribute' }, { from: 'pillar_integration', to: 'integ_function' }, { from: 'pillar_integration', to: 'integ_plurals' },
            { from: 'pillar_advanced', to: 'extend_parser' },
            { from: 'pillar_faq', to: 'faq_install' }, { from: 'pillar_faq', to: 'faq_components' }, { from: 'pillar_faq', to: 'faq_window' }, { from: 'pillar_faq', to: 'faq_editor' },
            { from: 'setup_initial', to: 'tab_actions' }, { from: 'tab_actions', to: 'pillar_translation' }, { from: 'tab_actions', to: 'trans_auto' }, { from: 'integ_function', to: 'comp_behaviour' }, { from: 'pillar_integration', to: 'pillar_automation' }, { from: 'pillar_notes', to: 'pillar_setup' }, { from: 'pillar_notes', to: 'pillar_integration' }, { from: 'faq_components', to: 'pillar_automation' }, { from: 'faq_window', to: 'pillar_management' },
        ]
    },

    init() {
        this.bindEvents();
    },

    wordWrap(str, maxWidth = 25) {
        const newLineStr = "\n";
        let res = '';
        while (str.length > maxWidth) {
            let found = false;
            for (let i = maxWidth - 1; i >= 0; i--) {
                if (/\s/.test(str[i])) {
                    res += str.slice(0, i) + newLineStr;
                    str = str.slice(i + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                res += str.slice(0, maxWidth) + newLineStr;
                str = str.slice(maxWidth);
            }
        }
        return res + str;
    },

    generateAndShow() {
        if (this.network) {
            this.network.destroy();
            this.network = null;
        }
        const { nodes, edges } = this.transformData();
        const hasSavedPositions = this.loadPositions(nodes);
        const options = this.getOptions(hasSavedPositions);

        this.network = new vis.Network(DOM.mindmapContainer, { nodes, edges }, options);
        this.bindNetworkEvents();
    },

    transformData() {
        const translations = LanguageHandler.translationsCache[localStorage.getItem('language') || 'en'] || {};
        const nodes = new vis.DataSet(
            this.mindMapData.nodes.map(node => {
                const tempDiv = document.createElement('div');
                let titleKey = node.labelKey;
                if (!/^(li_|nav_|page_)/.test(titleKey)) {
                    titleKey = titleKey.replace(/^h[1-2]_/, 'nav_');
                }
                tempDiv.innerHTML = translations[titleKey] || node.id;
                const cleanText = tempDiv.textContent.replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F1E0}-\u{1F1FF}]/gu, '').trim();
                return { ...node, label: this.wordWrap(cleanText) };
            })
        );
        return { nodes, edges: new vis.DataSet(this.mindMapData.edges) };
    },

    savePositions() {
        if (!this.network) return;
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.network.getPositions()));
        } catch (e) {
            console.error("Failed to save mind map positions:", e);
        }
    },

    loadPositions(nodesDataSet) {
        try {
            const savedPositions = localStorage.getItem(this.storageKey);
            if (savedPositions) {
                const positions = JSON.parse(savedPositions);
                const updates = nodesDataSet.getIds()
                    .filter(id => positions[id])
                    .map(id => ({ id, x: positions[id].x, y: positions[id].y }));

                if (updates.length > 0) {
                    nodesDataSet.update(updates);
                    return true;
                }
            }
        } catch (e) {
            console.error("Failed to load mind map positions:", e);
            localStorage.removeItem(this.storageKey);
        }
        return false;
    },

    getOptions(hasSavedPositions = false) {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        const colors = {
            font: isDarkMode ? '#c9d1d9' : '#24292e',
            edge: isDarkMode ? '#484f58' : '#d0d7de',
            center: { background: isDarkMode ? '#316dca' : '#0969da', border: isDarkMode ? '#58a6ff' : '#0366d6', font: '#ffffff' },
            branch: { background: isDarkMode ? '#21262d' : '#f6f8fa', border: isDarkMode ? '#30363d' : '#d0d7de' },
            subnode: { background: isDarkMode ? '#161b22' : '#ffffff', border: isDarkMode ? '#30363d' : '#d8dee4' }
        };
        return {
            interaction: { hover: true, tooltipDelay: 200 },
            physics: {
                enabled: true,
                solver: 'barnesHut',
                barnesHut: { gravitationalConstant: -30000, centralGravity: 0.15, springLength: 200, springConstant: 0.05, damping: 0.3, avoidOverlap: 1 },
                stabilization: { enabled: !hasSavedPositions, iterations: 250, fit: !hasSavedPositions },
            },
            nodes: { shape: 'box', margin: { top: 10, right: 15, bottom: 10, left: 15 }, font: { multi: true, color: colors.font }, borderWidth: 1, shadow: true },
            edges: { color: { color: colors.edge, highlight: colors.center.border }, arrows: { to: { enabled: true, scaleFactor: 0.7 } }, width: 1, smooth: { type: 'continuous' } },
            groups: {
                center: { color: { background: colors.center.background, border: colors.center.border }, font: { color: colors.center.font, size: 18, face: 'sans-serif', bold: { size: 18 } }, borderWidth: 2 },
                branch: { color: { background: colors.branch.background, border: colors.branch.border }, font: { size: 15, face: 'sans-serif' } },
                subnode: { color: { background: colors.subnode.background, border: colors.subnode.border }, font: { size: 13, face: 'sans-serif', color: isDarkMode ? '#8b949e' : '#57606a' } }
            }
        };
    },

    bindNetworkEvents() {
        this.network.on('click', (params) => {
            if (params.nodes.length > 0) {
                const node = this.network.body.data.nodes.get(params.nodes[0]);
                if (node?.href) {
                    const targetElement = document.querySelector(node.href);
                    if (targetElement) {
                        this.close();
                        setTimeout(() => targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
                    }
                }
            }
        });
        this.network.on('dragEnd', () => this.savePositions());
        this.network.on("stabilizationIterationsDone", () => this.savePositions());
    },

    bindEvents() {
        DOM.mindmapToggle.addEventListener('click', () => this.open());
        DOM.mindmapClose.addEventListener('click', () => this.close());
        DOM.mindmapOverlay.addEventListener('click', (e) => {
            if (e.target === DOM.mindmapOverlay) this.close();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && DOM.mindmapOverlay.classList.contains('show')) this.close();
        });
    },

    open() {
        DOM.mindmapOverlay.classList.add('show');
        document.body.classList.add('mindmap-active');
        setTimeout(() => this.generateAndShow(), 50);
    },

    close() {
        DOM.mindmapOverlay.classList.remove('show');
        document.body.classList.remove('mindmap-active');
        if (this.network) {
            setTimeout(() => {
                this.network.destroy();
                this.network = null;
            }, 300);
        }
    }
};
