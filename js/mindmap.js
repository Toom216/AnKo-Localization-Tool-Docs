import { DOM } from './dom.js';
import { LanguageHandler } from './languageHandler.js';

/**
 * Manages the mind map functionality using the vis.js library.
 * Updated for v1.4.7 content structure.
 */
export const MindMap = {
    network: null,
    storageKey: 'mindmapNodePositions',
    presetStorageKey: 'mindmapCurrentPreset',
    currentPreset: 'full_view',
    fullNodesDataSet: null,
    fullEdgesDataSet: null,

    /**
     * Defines different views (presets) for the mind map.
     */
    presets: {
        'full_view': {
            name: 'Full View (All Nodes)',
            nameKey: 'mindmap_preset_full',
            nodes: null
        },
        'quick_start': {
            name: 'Quick Start',
            nameKey: 'mindmap_preset_quick_start',
            nodes: [
                'hub', 'pillar_setup', 'setup_install', 'setup_initial',
                'pillar_window', 'tab_settings', 'tab_content', 'tab_actions',
                'pillar_components', 'comp_text', 'comp_asset'
            ]
        },
        'ai_power_user': {
            name: 'AI & Automation',
            nameKey: 'mindmap_preset_ai', // New key needed
            nodes: [
                'hub', 'pillar_ai', 'ai_profiles', 'ai_context', 'ai_assistant', 'ai_audio',
                'pillar_editor', 'edit_mass', 'edit_context',
                'pillar_window', 'tab_actions', 'act_autotranslate'
            ]
        },
        'coder_flow': {
            name: 'Programmer / API',
            nameKey: 'mindmap_preset_dev',
            nodes: [
                'hub', 'pillar_usage', 'code_attr', 'code_func', 'code_async',
                'pillar_advanced', 'adv_parser', 'adv_addressables',
                'pillar_components', 'comp_behaviour'
            ]
        },
        'tools_integrations': {
            name: 'Tools & Integrations',
            nameKey: 'mindmap_preset_tools', // New key needed
            nodes: [
                'hub', 'pillar_tools', 'tool_tms', 'tool_migration', 'tool_fonts', 'tool_pseudo',
                'pillar_window', 'tab_assets'
            ]
        }
    },

    /**
     * The data structure for the mind map.
     */
    mindMapData: {
        nodes: [
            // --- Level 0: Hub ---
            { id: 'hub', labelKey: 'page_title', href: '#introduction', group: 'level0', level: 0 },

            // --- Level 1: Pillars ---
            { id: 'pillar_setup', labelKey: 'nav_quick_start', href: '#quick-start', group: 'level1', level: 1 },
            { id: 'pillar_components', labelKey: 'nav_components', href: '#core-components', group: 'level1', level: 1 },
            { id: 'pillar_window', labelKey: 'nav_loc_tool_window', href: '#localization-tool-window', group: 'level1', level: 1 },
            { id: 'pillar_editor', labelKey: 'nav_translation_editor', href: '#translation-editor', group: 'level1', level: 1 },
            { id: 'pillar_ai', labelKey: 'mindmap_node_ai_ecosystem', href: '#ai-profiles', group: 'level1', level: 1 }, // New Label
            { id: 'pillar_usage', labelKey: 'nav_usage_examples', href: '#usage-examples', group: 'level1', level: 1 },
            { id: 'pillar_tools', labelKey: 'mindmap_node_dev_tools', href: '#migration-tool', group: 'level1', level: 1 }, // New Label
            { id: 'pillar_advanced', labelKey: 'nav_extending', href: '#extending-functionality', group: 'level1', level: 1 },
            { id: 'pillar_faq', labelKey: 'nav_faq', href: '#faq', group: 'level1', level: 1 },

            // --- Level 2 & 3: Details ---

            // 1. Setup
            { id: 'setup_install', labelKey: 'nav_installation', href: '#installation', group: 'level2', level: 2 },
            { id: 'setup_initial', labelKey: 'nav_initial_setup', href: '#initial-setup', group: 'level2', level: 2 },

            // 2. Components
            { id: 'comp_text', labelKey: 'nav_localizedtext', href: '#localized-text', group: 'level2', level: 2 },
            { id: 'comp_asset', labelKey: 'nav_localizedasset', href: '#localized-asset', group: 'level2', level: 2 },
            { id: 'comp_prefab', labelKey: 'nav_localizedprefab', href: '#localized-prefab', group: 'level2', level: 2 },
            { id: 'comp_uitk', labelKey: 'nav_uitklocalization', href: '#uitk-localization', group: 'level2', level: 2 },
            { id: 'comp_dropdown', labelKey: 'nav_localizeddropdown', href: '#localized-dropdown', group: 'level2', level: 2 },
            { id: 'comp_behaviour', labelKey: 'nav_localizedbehaviour', href: '#localized-behaviour', group: 'level2', level: 2 },
            { id: 'comp_context', labelKey: 'nav_context_menu', href: '#context-menu', group: 'level3', level: 3 },

            // 3. Window
            { id: 'tab_preview', labelKey: 'nav_in_editor_preview', href: '#in-editor-preview', group: 'level2', level: 2 },
            { id: 'tab_settings', labelKey: 'nav_tab_settings', href: '#settings-tab', group: 'level2', level: 2 },
            { id: 'tab_content', labelKey: 'nav_tab_content', href: '#content-tab', group: 'level2', level: 2 },
            { id: 'tab_actions', labelKey: 'nav_tab_actions', href: '#actions-tab', group: 'level2', level: 2 },
            { id: 'tab_assets', labelKey: 'nav_tab_assets', href: '#assets-tab', group: 'level2', level: 2 },
            { id: 'tab_report', labelKey: 'nav_tab_report', href: '#report-tab', group: 'level2', level: 2 },

            { id: 'set_updates', labelKey: 'li_feature_9', href: '#settings-tab', group: 'level3', level: 3 }, // Live Updates
            { id: 'cnt_regex', labelKey: 'li_content_6', href: '#content-tab', group: 'level3', level: 3 }, // Regex Rules
            { id: 'act_autotranslate', labelKey: 'li_actions_4', href: '#actions-tab', group: 'level3', level: 3 },

            // 4. Editor
            { id: 'edit_group', labelKey: 'li_editor_1', href: '#translation-editor', group: 'level2', level: 2 }, // Smart Grouping
            { id: 'edit_mass', labelKey: 'li_editor_4', href: '#translation-editor', group: 'level2', level: 2 }, // Mass Actions
            { id: 'edit_context', labelKey: 'li_editor_8', href: '#translation-editor', group: 'level2', level: 2 }, // AI Context Menu

            // 5. AI Ecosystem
            { id: 'ai_profiles', labelKey: 'nav_ai_profiles_overview', href: '#ai-profiles-overview', group: 'level2', level: 2 },
            { id: 'ai_custom', labelKey: 'nav_custom_ai', href: '#custom-ai', group: 'level2', level: 2 },
            { id: 'ai_context', labelKey: 'nav_ai_context', href: '#ai-context', group: 'level2', level: 2 },
            { id: 'ai_assistant', labelKey: 'nav_ai_assistant', href: '#ai-assistant', group: 'level2', level: 2 },
            { id: 'ai_audio', labelKey: 'nav_ai_audio', href: '#ai-audio', group: 'level2', level: 2 },

            // 6. Usage / Code
            { id: 'code_attr', labelKey: 'nav_example_attribute', href: '#localizable-field-attribute', group: 'level2', level: 2 },
            { id: 'code_func', labelKey: 'nav_example_function', href: '#onlanguagechange-function', group: 'level2', level: 2 },
            { id: 'code_plurals', labelKey: 'nav_example_plurals', href: '#plurals-and-gender', group: 'level2', level: 2 },
            { id: 'code_async', labelKey: 'mindmap_node_async_code', href: '#h2_async_api', group: 'level2', level: 2 }, // New Label

            // 7. Tools & Utils
            { id: 'tool_migration', labelKey: 'nav_migration_tool', href: '#migration-tool', group: 'level2', level: 2 },
            { id: 'tool_tms', labelKey: 'mindmap_node_tms_integration', href: '#tms-integration', group: 'level2', level: 2 }, // New Label
            { id: 'tool_fonts', labelKey: 'nav_font_glyph_manager', href: '#font-glyph-manager', group: 'level2', level: 2 },
            { id: 'tool_pseudo', labelKey: 'mindmap_node_pseudo', href: '#pseudo-tool', group: 'level2', level: 2 }, // New Label

            // 8. Advanced / FAQ
            { id: 'adv_parser', labelKey: 'nav_custom_parser', href: '#custom-parser', group: 'level2', level: 2 },
            { id: 'adv_addressables', labelKey: 'li_settings_7', href: '#settings-tab', group: 'level2', level: 2 },
            { id: 'faq_install', labelKey: 'nav_faq_installation', href: '#faq-installation', group: 'level2', level: 2 },
            { id: 'faq_comp', labelKey: 'nav_faq_components', href: '#faq-components', group: 'level2', level: 2 },
        ],
        edges: [
            // --- Hub Connections ---
            { from: 'hub', to: 'pillar_setup' },
            { from: 'hub', to: 'pillar_components' },
            { from: 'hub', to: 'pillar_window' },
            { from: 'hub', to: 'pillar_editor' },
            { from: 'hub', to: 'pillar_ai' },
            { from: 'hub', to: 'pillar_usage' },
            { from: 'hub', to: 'pillar_tools' },
            { from: 'hub', to: 'pillar_advanced' },
            { from: 'hub', to: 'pillar_faq' },

            // --- Structure Connections ---
            { from: 'pillar_setup', to: 'setup_install' }, { from: 'pillar_setup', to: 'setup_initial' },

            { from: 'pillar_components', to: 'comp_text' }, { from: 'pillar_components', to: 'comp_asset' },
            { from: 'pillar_components', to: 'comp_prefab' }, { from: 'pillar_components', to: 'comp_uitk' },
            { from: 'pillar_components', to: 'comp_dropdown' }, { from: 'pillar_components', to: 'comp_behaviour' },
            { from: 'comp_asset', to: 'comp_context', labelKey: 'mindmap_edge_enables_reaction' },

            { from: 'pillar_window', to: 'tab_preview' }, { from: 'pillar_window', to: 'tab_settings' },
            { from: 'pillar_window', to: 'tab_content' }, { from: 'pillar_window', to: 'tab_actions' },
            { from: 'pillar_window', to: 'tab_assets' }, { from: 'pillar_window', to: 'tab_report' },
            { from: 'tab_settings', to: 'set_updates' }, { from: 'tab_content', to: 'cnt_regex' },

            { from: 'pillar_editor', to: 'edit_group' }, { from: 'pillar_editor', to: 'edit_mass' }, { from: 'pillar_editor', to: 'edit_context' },

            { from: 'pillar_ai', to: 'ai_profiles' }, { from: 'pillar_ai', to: 'ai_custom' },
            { from: 'pillar_ai', to: 'ai_context' }, { from: 'pillar_ai', to: 'ai_assistant' },
            { from: 'pillar_ai', to: 'ai_audio' },

            { from: 'pillar_usage', to: 'code_attr' }, { from: 'pillar_usage', to: 'code_func' },
            { from: 'pillar_usage', to: 'code_plurals' }, { from: 'pillar_usage', to: 'code_async' },

            { from: 'pillar_tools', to: 'tool_migration' }, { from: 'pillar_tools', to: 'tool_tms' },
            { from: 'pillar_tools', to: 'tool_fonts' }, { from: 'pillar_tools', to: 'tool_pseudo' },

            { from: 'pillar_advanced', to: 'adv_parser' }, { from: 'pillar_advanced', to: 'adv_addressables' },

            { from: 'pillar_faq', to: 'faq_install' }, { from: 'pillar_faq', to: 'faq_comp' },

            // --- Workflow Connections (Cross-Pillar) ---

            // AI Integration
            { from: 'ai_profiles', to: 'act_autotranslate', labelKey: 'mindmap_edge_enables_reaction' }, // Profiles power auto-translate
            { from: 'ai_profiles', to: 'ai_audio', labelKey: 'mindmap_edge_generates' }, // Profiles config audio
            { from: 'ai_assistant', to: 'edit_context', labelKey: 'mindmap_edge_opens' }, // Assistant is in editor context menu

            // Assets & Addressables
            { from: 'adv_addressables', to: 'code_async', labelKey: 'mindmap_edge_recommends_for' }, // Async required for Addressables
            { from: 'tab_assets', to: 'comp_asset', labelKey: 'mindmap_edge_manages_assets' },

            // Code & Components
            { from: 'code_attr', to: 'tab_content', labelKey: 'mindmap_edge_processed_by' }, // Parser reads attributes
            { from: 'comp_behaviour', to: 'code_func', labelKey: 'mindmap_edge_enables_reaction' },

            // TMS
            { from: 'tool_tms', to: 'tab_settings', labelKey: 'mindmap_edge_configure' }, // TMS Configured in Settings

            // Migration
            { from: 'tool_migration', to: 'setup_install', labelKey: 'mindmap_edge_relates_to' }, // Often done at start
        ]
    },

    /**
     * Initializes the MindMap module.
     */
    init() {
        this.populatePresetSelector();
        this.bindEvents();
    },

    /**
     * Populates the preset selector.
     */
    populatePresetSelector() {
        const selector = document.getElementById('mindmap-preset-selector');
        if (!selector) return;
        selector.innerHTML = '';
        const translations = LanguageHandler.translationsCache[localStorage.getItem('language') || 'en'] || {};
        for (const key in this.presets) {
            const preset = this.presets[key];
            const option = document.createElement('option');
            option.value = key;
            option.textContent = translations[preset.nameKey] || preset.name;
            selector.appendChild(option);
        }
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
            this.applyPreset(this.currentPreset);
            return;
        }

        DOM.mindmapContainer.innerHTML = '';
        const { nodes, edges } = this.transformData();

        this.fullNodesDataSet = new vis.DataSet(nodes);
        this.fullEdgesDataSet = new vis.DataSet(edges);

        const hasSavedPositions = this.loadPositions(this.fullNodesDataSet);
        const options = this.getOptions(hasSavedPositions);

        this.network = new vis.Network(DOM.mindmapContainer, { nodes: this.fullNodesDataSet, edges: this.fullEdgesDataSet }, options);
        this.bindNetworkEvents();
        this.applyPreset(this.currentPreset);
    },

    applyPreset(presetKey) {
        if (!this.network || !this.fullNodesDataSet) return;

        const selectedPreset = this.presets[presetKey];
        const visibleNodeIds = selectedPreset?.nodes ? new Set(selectedPreset.nodes) : null;

        const nodeUpdates = this.fullNodesDataSet.getIds().map(id => ({
            id,
            hidden: visibleNodeIds ? !visibleNodeIds.has(id) : false
        }));
        this.fullNodesDataSet.update(nodeUpdates);

        const edgeUpdates = this.fullEdgesDataSet.map(edge => ({
            id: edge.id,
            hidden: visibleNodeIds ? (!visibleNodeIds.has(edge.from) || !visibleNodeIds.has(edge.to)) : false
        }));
        this.fullEdgesDataSet.update(edgeUpdates);
    },

    transformData() {
        const translations = LanguageHandler.translationsCache[localStorage.getItem('language') || 'en'] || {};

        const nodes = this.mindMapData.nodes.map(node => {
            const tempDiv = document.createElement('div');
            let titleKey = node.labelKey;
            // Clean keys for standard navigation items if not found explicitly
            if (!translations[titleKey] && !/^(li_|nav_|page_|mindmap_)/.test(titleKey)) {
                titleKey = titleKey.replace(/^h[1-2]_/, 'nav_');
            }

            tempDiv.innerHTML = translations[titleKey] || node.id;
            const cleanText = tempDiv.textContent
                .replace(/[\u{1F600}-\u{1F6FF}\u{1F300}-\u{1F5FF}\u{1F1E0}-\u{1F1FF}]/gu, '') // Remove emojis
                .trim()
                .replace(/^\d+\.\s*/, ''); // Remove numbering (1., 2.)
            return { ...node, label: this.wordWrap(cleanText) };
        });

        const edges = this.mindMapData.edges.map((edge, index) => {
            const newEdge = { ...edge, id: edge.id || `edge-${index}` };
            if (edge.labelKey && translations[edge.labelKey]) {
                newEdge.label = translations[edge.labelKey];
            }
            return newEdge;
        });

        return { nodes, edges };
    },

    savePositions() {
        if (this.network) {
            this.network.storePositions();
            localStorage.setItem(this.storageKey, JSON.stringify(this.network.getPositions()));
        }
    },

    loadPositions(nodesDataSet) {
        try {
            const savedPositions = localStorage.getItem(this.storageKey);
            if (savedPositions) {
                const positions = JSON.parse(savedPositions);
                const updates = [];
                nodesDataSet.getIds().forEach(id => {
                    if (positions[id]) {
                        updates.push({ id: id, x: positions[id].x, y: positions[id].y });
                    }
                });
                nodesDataSet.update(updates);
                return true;
            }
        } catch (e) {
            console.error("Failed to load positions:", e);
        }
        return false;
    },

    resetView() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.presetStorageKey);
        if (this.network) {
            this.network.destroy();
            this.network = null;
            this.fullNodesDataSet = null;
            this.fullEdgesDataSet = null;
        }
        this.open();
    },

    getOptions(hasSavedPositions = false) {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

        const colors = {
            font: isDarkMode ? '#c9d1d9' : '#3d3d3d',
            edge: isDarkMode ? '#484f58' : '#cccccc',
            light: {
                level0: { bg: '#4a90e2', border: '#4a90e2', font: '#ffffff' },
                level1: { bg: '#e7f3ff', border: '#8ab4f8' },
                level2: { bg: '#f1f8e9', border: '#a5d6a7' },
                level3: { bg: '#fafafa', border: '#e0e0e0', font: '#757575' },
            },
            dark: {
                level0: { bg: '#8ab4f8', border: '#8ab4f8', font: '#202124' },
                level1: { bg: '#2d333b', border: '#58a6ff' },
                level2: { bg: '#22272e', border: '#484f58' },
                level3: { bg: '#161b22', border: '#30363d', font: '#8b949e' },
            }
        };
        const themeColors = isDarkMode ? colors.dark : colors.light;

        return {
            interaction: { hover: true },
            physics: {
                enabled: !hasSavedPositions,
                barnesHut: {
                    gravitationalConstant: -25000,
                    centralGravity: 0.25,
                    springLength: 220,
                    springConstant: 0.03,
                    damping: 0.3,
                    avoidOverlap: 0.6
                },
                stabilization: {
                    enabled: !hasSavedPositions,
                    iterations: 500,
                    fit: true,
                    updateInterval: 25
                }
            },
            layout: { hierarchical: false },
            nodes: {
                shape: 'box',
                margin: { top: 12, right: 18, bottom: 12, left: 18 },
                font: { multi: true, color: colors.font, face: 'sans-serif' },
                borderWidth: 1,
                shadow: {
                    enabled: true,
                    color: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)',
                    size: 5,
                    y: 2
                },
            },
            edges: {
                color: { color: colors.edge, highlight: themeColors.level0.border },
                font: { align: 'top', color: themeColors.level3.font, size: 11 },
                width: 1,
                arrows: { to: { enabled: true, scaleFactor: 0.7 } },
                smooth: { type: 'cubicBezier', forceDirection: 'vertical', roundness: 0.4 }
            },
            groups: {
                level0: { color: { background: themeColors.level0.bg, border: themeColors.level0.border }, font: { color: themeColors.level0.font, size: 18, bold: { size: 18 } }, borderWidth: 1.5 },
                level1: { color: { background: themeColors.level1.bg, border: themeColors.level1.border }, font: { size: 16 } },
                level2: { color: { background: themeColors.level2.bg, border: themeColors.level2.border }, font: { size: 14 } },
                level3: { color: { background: themeColors.level3.bg, border: themeColors.level3.border }, font: { size: 12, color: themeColors.level3.font } }
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

        this.network.on('stabilizationIterationsDone', () => {
            this.savePositions();
            this.network.setOptions({ physics: false });
        });

        this.network.on('dragStart', () => this.network.setOptions({ physics: true }));
        this.network.on('dragEnd', () => {
            this.savePositions();
            this.network.setOptions({ physics: false });
        });
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
        const resetButton = document.getElementById('mindmap-reset');
        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetView());
        }
        const presetSelector = document.getElementById('mindmap-preset-selector');
        if (presetSelector) {
            presetSelector.addEventListener('change', (e) => {
                this.currentPreset = e.target.value;
                localStorage.setItem(this.presetStorageKey, this.currentPreset);
                this.applyPreset(this.currentPreset);
            });
        }
    },

    open() {
        DOM.mindmapOverlay.classList.add('show');
        document.body.classList.add('mindmap-active');

        this.currentPreset = localStorage.getItem(this.presetStorageKey) || 'full_view';
        const presetSelector = document.getElementById('mindmap-preset-selector');
        if (presetSelector) {
            presetSelector.value = this.currentPreset;
        }

        setTimeout(() => this.generateAndShow(), 50);
    },

    close() {
        DOM.mindmapOverlay.classList.remove('show');
        document.body.classList.remove('mindmap-active');
        if (this.network) {
            setTimeout(() => {
                this.network.destroy();
                this.network = null;
                this.fullNodesDataSet = null;
                this.fullEdgesDataSet = null;
            }, 300);
        }
    }
};