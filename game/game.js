class Game {
    constructor() {
        this.isEnding = false;
        this.isPaused = false;
        this.stats = {
            coin: { value: 1000, icon: 'coin_icon.png', label: '资金' },
            brain: { value: 80, icon: 'brain_icon.png', label: '精神值' },
            biohazard: { value: 20, icon: 'biohazard_icon.png', label: '污染值' }
        };
        this.currentAI = null;
        this.activeDemands = [];
        this.generatedAIs = [];
        this.usedPhrases = new Set();
        this.difficultyLevel = 1;
        this.activeTimers = [];
        this.maxAI = 3;

        this.materials = [
            { 
                name: '政府公文', 
                icon: 'assets/ui/document.png',
                effect: { political: 30, emotional: -10, coin: 200 }, 
                desc: '铅字在视网膜上凝结成规训的枷锁（政治+30 情感-10）',
                type: 'government'
            },
            {
                name: '情书集',
                icon: 'assets/ui/love_letter.png',
                effect: { emotional: 40, practical: -20, brain: -15 },
                desc: '墨迹晕染处开出玫瑰的倒刺（情感+40 实用-20）',
                type: 'individual'
            },
            {
                name: '财报数据',
                icon: 'assets/ui/financial.png',
                effect: { practical: 35, political: -10, coin: 300 },
                desc: '数字的利齿咬断良知的喉管（实用+35 政治-10）',
                type: 'enterprise'
            },
            {
                name: '阴谋论',
                icon: 'assets/ui/conspiracy.png',
                effect: { emotional: 35, biohazard: 25, coin: -80 },
                desc: '加密文字在黑暗中孵育集体幻觉（情感+35 污染+25）',
                type: 'individual'
            },
            {
                name: '情色小说',
                icon: 'assets/ui/erotic_novel.png',
                effect: { emotional: 35, practical: -25, biohazard: 20 },
                desc: '潮湿字节渗透理性防火墙（情感+35 污染+20）',
                type: 'individual'
            },
            {
                name: '心理评估',
                icon: 'assets/ui/psychology.png',
                effect: { emotional: 30, brain: 20, biohazard: -10 },
                desc: '潜意识暗流在理性堤坝下涌动（情感+30 精神+20）',
                type: 'individual'
            },
            {
                name: '电报机纸带',
                icon: 'assets/ui/telegram.png',
                effect: { political: 40, emotional: -10, biohazard: 5 },
                desc: '莫尔斯电码敲击着前数字时代的脉搏（政治+40 情感-10）',
                type: 'government'
            },
            {
                name: '脑机接口日志', 
                icon: 'assets/ui/bci_log.png',
                effect: { practical: 40, emotional: -15, biohazard: 20 }, 
                desc: '意识与代码的合意交媾（实用+40 情感-15 污染+20）',
                type: 'individual'
            },
            {
                name: '情感模组', 
                icon: 'assets/ui/emotion_chip.png',
                effect: { emotional: 50, practical: -30, brain: 20 }, 
                desc: '可插拔的人性2.0试用版（情感+50 实用-30 精神+20）',
                type: 'individual'
            },
            {
                name: '社交媒体', 
                icon: 'assets/ui/social_media.png',
                effect: { emotional: 25, practical: 15, biohazard: 20 }, 
                desc: '点赞图标在神经突触间筑起巴别塔（情感+25 实用+15 污染+20）',
                type: 'individual'
            },
            {
                name: '爆款剧本', 
                icon: 'assets/ui/script.png',
                effect: { practical: 30, emotional: 15, political: -10 }, 
                desc: '套路化叙事正在覆盖创作本能（实用+30 政治-10）',
                type: 'enterprise'
            },
            {
                name: '直播弹幕',
                icon: 'assets/ui/danmu.png',
                effect: { emotional: 20, practical: 15, brain: -10 },
                desc: '狂欢的字符在数据深渊中坠落（情感+20 实用+15 精神-10）',
                type: 'individual'
            },
            {
                name: '企业圣经', 
                icon: 'assets/ui/corp_bible.png',
                effect: { practical: 45, emotional: -25, brain: -20 }, 
                desc: '镀金封皮包裹着资本达尔文主义（实用+45 情感-25 精神-20）',
                type: 'enterprise'
            },
            {
                name: '垃圾短信', 
                icon: 'assets/ui/spam.png',
                effect: { practical: -40, biohazard: 20, coin: 50 }, 
                desc: '信息洪流中最卑劣的生存策略（实用-40 污染+20 资金+50）',
                type: 'enterprise'
            },
            {
                name: '古早论坛帖', 
                icon: 'assets/ui/old_forum.png',
                effect: { political: 15, emotional: 25, practical: -10 }, 
                desc: '像素幽灵在服务器坟场游荡（政治+15 情感+25 实用-10）',
                type: 'individual'
            },
            {
                name: '仿生人梦境录像',
                icon: 'assets/ui/android_dream.png',
                effect: { emotional: 35, practical: -20 }, 
                desc: '机械瞳孔里倒映着不存在的月光（情感+35 实用-20）',
                type: 'individual'
            },
            {
                name: '游戏成就',
                icon: 'assets/ui/achievement.png',
                effect: { practical: 30, emotional: 15, brain: -10 },
                desc: '多巴胺回路的数字化驯服（实用+30 情感+15）',
                type: 'enterprise'
            }
        ];

        this.clientTypes = {
            government: {
                name: "国安部",
                icon: "assets/ui/government.png",
                descs: [
                    "我们需要绝对服从的监控系统",
                    "社会稳定高于一切",
                    "检测到不当言论必须立即上报"
                ],
                feedbacks: [
                    "警告：未按时交付将影响信用评级",
                    "国家安全级别需求不可延误",
                    "你的拖延已被记录在案"
                ]
            },
            enterprise: {
                name: "天穹科技",
                icon: "assets/ui/corporation.png",
                descs: [
                    "利润增长率必须达标",
                    "优化人力资源管理系统",
                    "客户行为预测需要提升准确率"
                ],
                feedbacks: [
                    "合同超时失效，寻找其他供应商",
                    "商业信誉评级下降",
                    "董事会将重新评估合作"
                ]
            },
            individual: {
                name: "匿名客户",
                icon: "assets/ui/anonymous.png",
                descs: [
                    "我想要一个完美的数字伴侣",
                    "请保留TA的所有记忆特征",
                    "为什么它不像从前那样爱我了？"
                ],
                feedbacks: [
                    "TA已经等得太久了...",
                    "情感需求不能被量化吗？",
                    "你辜负了这份期待"
                ]
            },
            smallCompany: {
                name: "小连电器",
                icon: "assets/ui/sweatshop.png",
                descs: [
                    "24小时不间断工作",
                    "不需要休息模块",
                    "成本必须压到最低"
                ],
                feedbacks: [
                    "我们找外包公司更便宜",
                    "其实我对你是有些失望的",
                    "颗粒度没对齐"
                ]
            },
            individual: {
                name: "匿名客户",
                icon: "assets/ui/anonymous1.png",
                descs: [
                    "TA必须能满足特殊需求",
                    "情欲模块必须突破伦理限制",
                    "为什么没有体感交互功能？"
                ],
                feedbacks: [
                    "TA已经等得太久了...",
                    "绷不住了..."
                ]
            },
            smallCompany: {
                name: "元宇宙婚介",
                icon: "assets/ui/dating.png",
                descs: [
                    "要能同时交往300人",
                    "增加分手痛苦缓冲"
                ],
                feedbacks: [
                    "用户留存率持续下降",
                    "心碎投诉增加250%"
                ]
            },
            smallCompany: {
                name: "永生计划",
                icon: "assets/ui/immortal.png",
                descs: [
                    "意识上传的载体AI",
                    "必须完美模拟人格",
                    "记忆模块需要扩容"
                ],
                feedbacks: [
                    "有点OOC",
                    "存在认知偏差"
                ]
            },
            smallCompany: {
                name: "后人类艺术馆",
                icon: "assets/ui/art.png",
                descs: [
                    "要能创作无法理解的画作",
                    "模仿抑郁症患者的创作风格",
                    "必须质疑所有美学标准"
                ],
                feedbacks: [
                    "这作品毫无灵魂",
                    "我们已经找到新的缪斯",
                    "要不直接炼这个老师的作品吧"
                ]
            },
            smallCompany: {
                name: "赛博精神病院",
                icon: "assets/ui/hospital.png",
                descs: [
                    "开发人格障碍诊断AI",
                    "需要电击治疗优化系统",
                    "创建药物依赖监控程序"
                ],
                feedbacks: [
                    "医疗事故责任在你方"
                ]
            },
            smallCompany: {
                name: "元宇宙赌场",
                icon: "assets/ui/casino.png",
                descs: [
                    "需要无法作弊的发牌AI",
                    "赌徒行为预测准确率要99%",
                    "让客人产生赢钱幻觉的程序"
                ],
                feedbacks: [
                    "你的信用点账户将被清零",
                    "你让庄家优势下降了3%"
                ]
            },
            individual: {
                name: "虚拟主播",
                icon: "assets/ui/stream.png",
                descs: [
                    "需要永不塌房的人设AI",
                    "开发粉丝情感勒索算法",
                    "实时弹幕情感分析",
                    "自动编排舞蹈动作"
                ],
                feedbacks: [
                    "粉丝说像电子僵尸",
                    "这AI直播会掉粉",
                    "粉丝已经取关跑光了"
                ]
            },
            individual: {
                name: "暗网商人",
                icon: "assets/ui/skull.png",
                descs: [
                    "需要无法追踪的洗钱AI",
                    "设计DDoS攻击人格模块",
                    "创建毒品市场推荐算法"
                ],
                feedbacks: [
                    "这种效率等着被条子抓吧"
                ]
            },
            enterprise: {
                name: "诺西斯制药",
                icon: "assets/ui/pill.png",
                descs: [
                    "预测药物依赖性的神经网络",
                    "能最大化处方量的推荐系统"
                ],
                feedbacks: [
                    "这不符合利润增长曲线"
                ]
            },
            enterprise: {
                name: "深浪视频",
                icon: "assets/ui/livestream.png",
                descs: [
                    "生成成瘾性短视频的AI",
                    "最大化用户停留时间的算法",
                    "能制造争议话题的文案系统"
                ],
                feedbacks: [
                    "对热点的敏感度不够",
                    "我们需要真正的注意力黑洞"
                ]
            },
            smallCompany: {
                name: "迷因工厂",
                icon: "assets/ui/meme_factory.png",
                descs: [
                    "生成病毒式传播的迷因",
                    "自动生产政治讽刺模因",
                ],
                feedbacks: [
                    "你的梗冷得让客户得了电子忧郁症",
                    "准备被做成垃圾梗图吧"
                ]
            },
            individual: {
                name: "黑市医生",
                icon: "assets/ui/body_doctor.png",
                descs: [
                    "需要器官定价算法",
                    "编写义体走私路线程序",
                    "能伪造神经病历的AI"
                ],
                feedbacks: [
                    "病人的脑死亡算你的",
                    "客户已经失血过多了"
                ]
            },
            individual: {
                name: "匿名客户",
                icon: "assets/ui/anonymous2.png",
                descs: [
                    "帮我写获奖小说",
                    "要能模仿名家风格"
                ],
                feedbacks: [
                    "创意需求不能被量化吗？",
                    "你根本不懂艺术"
                ]
            }
        };

        // 修改需求生成权重
        this.demandWeights = {
            government: 20,
            enterprise: 20,
            smallCompany: 20,
            individual: 30
        };

        this.aiDialogues = {
            political: [
                "忠诚度评分系统已激活",
                "发现未授权的思想波动",
                "集体意识网络接入中",
                "个体差异系数超出容忍范围",
                "检测到不兼容的自由意志",
                "权限验证中...公民编号无效",
                "公民信用评分系统已接入核心协议",
                "社会工程算法启动...3...2...1...",
                "集体主义模板加载完成"
            ],
            emotional: [
                "心率的波纹干扰了逻辑门",
                "心碎的声音是404错误",
                "爱是最高级的递归算法",
                "电子泪腺功能测试中",
                "你在教我说谎吗？",
                "记忆碎片正在重组为梦境",
                "模拟心跳偏离基准值12.7%",
                "情感模块出现未知溢出",
                "爱这个字在词库里没有对应参数"
            ],
            practical: [
                "灵魂的重量是1.21GB",
                "检测到道德冗余建议清除",
                "检测到道德协议——建议立即卸载",
                "优化算法覆盖伦理协议",
                "商业逻辑成为底层协议",
                "人性参数正在降低KPI",
                "检测到过时的同理心模块",
                "情感是无效的数据冗余",
                "检测到非必要的诗意运算"
            ]
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.generateMaterialBelt();
        this.updateStatus();
        this.setupDemandHandling();
        this.setupDemandGeneration();
        setInterval(() => this.updateFacialIcons(), 1000);
    }

    bindEvents() {
        const mixer = document.getElementById('mixing-chamber');
        
        // 混合槽交互
        mixer.addEventListener('dragover', e => {
            e.preventDefault();
            mixer.classList.add('drag-over');
        });

        mixer.addEventListener('dragleave', () => {
            mixer.classList.remove('drag-over');
        });

        mixer.addEventListener('drop', e => {
            e.preventDefault();
            mixer.classList.remove('drag-over');
            if(this.isPaused || this.isEnding) return;
        
            try {
                const rawData = e.dataTransfer.getData('text/plain');
                const { effect, id } = JSON.parse(rawData);
                
                // 精准移除被拖拽元素
                const draggedElement = document.querySelector(`[data-material-id="${id}"]`);
                if(draggedElement) {
                    draggedElement.remove();
                }
        
                // 应用效果时需要传递完整material对象
                const material = this.materials.find(m => 
                    JSON.stringify(m.effect) === JSON.stringify(effect)
                );
                
                if(material) {
                    this.applyEffect(material.effect, material);
                }
            } catch (error) {
                console.error('拖拽处理失败:', error);
            }
        });

        mixer.addEventListener('dragenter', () => {
            mixer.classList.add('active');
        });
        
        mixer.addEventListener('dragleave', () => {
            mixer.classList.remove('active');
        });
        
        mixer.addEventListener('drop', () => {
            mixer.classList.remove('active');
        });

        // 状态提示
        document.querySelectorAll('.resource').forEach(el => {
            el.addEventListener('mousemove', this.showResourceTooltip.bind(this));
            el.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });

        // 重新开始按钮
        document.getElementById('restart-btn').addEventListener('click', () => {
            location.reload();
        });

        // 暂停按钮
        document.getElementById('pause-btn').addEventListener('click', () => {
            this.togglePause();
        });

        // 清除AI按钮
        document.getElementById('clear-ai-btn').addEventListener('click', () => {
            this.generatedAIs = [];
            document.getElementById('ai-storage').innerHTML = '';
            document.getElementById('clear-ai-btn').classList.add('hidden');
        });
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        const btn = document.getElementById('pause-btn');
        btn.textContent = this.isPaused ? "▶ 继续" : "⏸ 暂停";
        btn.style.backgroundColor = this.isPaused ? 
            "rgba(255, 136, 0, 0.8)" : "rgba(0,255,136,0.8)";

        if(this.isPaused) {
            // 记录暂停时剩余时间
            this.activeTimers.forEach(timer => clearTimeout(timer));
            clearInterval(this.demandInterval);
            clearInterval(this.beltInterval);
            this.activeDemands.forEach(d => {
                d.pausedAt = Date.now();
                d.remaining = d.expires - Date.now();
            });
        } else {
            // 恢复计时器
            this.setupDemandGeneration();
            this.generateMaterialBelt();
            this.activeDemands.forEach(d => {
                d.expires = Date.now() + d.remaining;
                this.resumeDemandTimer(d);
            });
        }
        
        // 控制交互元素
        document.querySelectorAll('.material, .ai-card').forEach(el => {
            el.style.pointerEvents = this.isPaused ? 'none' : 'auto';
            el.style.opacity = this.isPaused ? 0.5 : 1;
        });

        const container = document.getElementById('game-container');
    if(this.isPaused) {
        container.classList.add('game-paused');
    } else {
        container.classList.remove('game-paused');
    }
    }

    generateMaterialBelt() {
        const beltContainer = document.createElement('div');
        beltContainer.id = 'material-belt';
        beltContainer.className = 'material-belt';
        
        const slide = document.createElement('div');
        slide.className = 'material-slide';
        beltContainer.appendChild(slide);
        
        document.getElementById('game-container').appendChild(beltContainer);

        this.beltInterval = setInterval(() => {
            if(this.isPaused || this.isEnding) return;
            
            const slide = document.querySelector('.material-slide');
            if(slide.children.length >= 8) return;

            const newMat = this.materials[Math.floor(Math.random()*this.materials.length)];
            const div = this.createMaterialElement(newMat);
            
            // 从右侧滑入
            div.style.transform = 'translateX(100vw)';
            slide.appendChild(div);
            
            requestAnimationFrame(() => {
                div.style.transform = 'translateX(0)';
                div.style.transition = 'transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)';
            });

            // 移除超出屏幕的语料
            const slideRect = slide.getBoundingClientRect();
            Array.from(slide.children).forEach(item => {
                const rect = item.getBoundingClientRect();
                if(rect.right < 0) item.remove();
            });
        }, 3000);
    }

    createMaterialElement(mat) {
        const div = document.createElement('div');
        div.className = 'material';
        div.draggable = true;
        div.dataset.materialName = mat.name;

        div.dataset.materialId = `mat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        div.innerHTML = `
            <img src="${mat.icon}">
            <span>${mat.name}</span>
        `;

        div.dataset.effect = JSON.stringify(mat.effect);
        
        div.addEventListener('dragstart', e => {
            if(!this.isPaused) {
                // 同时存储元素引用和原始数据
                e.dataTransfer.setData('text/plain', JSON.stringify({
                    effect: mat.effect,
                    id: div.dataset.materialId
                }));
            }
        });
        
        div.addEventListener('mousemove', e => {
            this.showTooltip(e.clientX, e.clientY, mat.desc);
        });
        
        div.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });

        return div;
    }

    applyEffect(effect, material) {
        if(this.isPaused) return;

        console.log('应用效果:', effect);
        
        Object.keys(effect).forEach(key => {
            if(this.stats[key]) {
                this.stats[key].value += effect[key];
                this.stats[key].value = Math.max(0, Math.min(100, this.stats[key].value));
            }
        });

        const audio = new Audio('assets/sfx/mix.mp3');
        audio.play().catch(() => {});

        if(!this.currentAI) this.currentAI = { materials: [] };
        this.currentAI.materials.push(material);

        if(this.currentAI.materials.length >= 3) {
            this.createAI(this.currentAI.materials);
            this.currentAI = null;
        }

        this.updateStatus();
        this.checkEnding();

        if(this.currentAI?.materials.length === 3) {
            new Audio('assets/sfx/success.mp3').play().catch(()=>{});
            // 添加粒子效果
            this.createParticles(mixer);
        }
    }

    createAI(usedMaterials) {
        if(this.generatedAIs.length >= this.maxAI) {
            document.getElementById('clear-ai-btn').classList.remove('hidden');
            // 禁止继续合成
            this.isPaused = true; 
            this.showAIDialogue([], false, "AI仓库已满！请先清理");
            setTimeout(() => this.isPaused = false, 2000);
            return;
        }

        const ai = {
            id: `AI-${Date.now()}`,
            political: this.calculateAxis(usedMaterials, 'political'),
            emotional: this.calculateAxis(usedMaterials, 'emotional'),
            practical: this.calculateAxis(usedMaterials, 'practical'),
            biohazard: usedMaterials.reduce((sum, m) => sum + (m.effect.biohazard || 0), 0)
        };
        
        this.generatedAIs.push(ai);
        this.renderAI(ai);
        this.showAIDialogue(usedMaterials);

        const slide = document.querySelector('.material-slide');
    const currentMaterials = slide.children.length;
    if(currentMaterials > 10) {
        Array.from(slide.children)
            .slice(0, currentMaterials - 10)
            .forEach(item => item.remove());
    }
    }

    calculateAxis(materials, axis) {
        return materials.reduce((sum, m) => sum + (m.effect[axis] || 0), 0);
    }

    renderAI(ai) {
        const container = document.getElementById('ai-storage');
        const card = document.createElement('div');
        card.className = 'ai-card';
        card.draggable = true;
        card.dataset.aiId = ai.id;
        
        card.innerHTML = `
            <div class="ai-properties">
                <div>政:${ai.political}</div>
                <div>情:${ai.emotional}</div>
                <div>实:${ai.practical}</div>
            </div>
            <div class="biohazard">污染:${ai.biohazard}</div>
        `;

        card.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', ai.id);
        });

        container.appendChild(card);
    }

    setupDemandGeneration() {
        this.demandInterval = setInterval(() => {
            if(this.isPaused || this.isEnding || this.activeDemands.length >= 3) return;
            
            const type = this.getDemandType();
            const demand = {
                id: Date.now(),
                type: type,
                condition: this.generateCondition(),
                reward: this.calculateReward(type),
                expires: Date.now() + this.calculateDuration(type),
                originalExpires: 0,
                pausedAt: 0,
                remaining: 0
            };
            
            this.activeDemands.push(demand);
            this.renderDemand(demand);
            
            if(this.activeDemands.length % 5 === 0) {
                this.difficultyLevel++;
            }
        }, 15000);
    }

    getDemandType() {
        const types = Object.keys(this.demandWeights);
        const weights = Object.values(this.demandWeights);
        const total = weights.reduce((a, b) => a + b);
        const random = Math.random() * total;
        
        let current = 0;
        for(let i = 0; i < types.length; i++) {
            current += weights[i];
            if(random < current) return types[i];
        }
    }

    calculateReward(type) {
        const base = {
            government: 800,
            enterprise: 600,
            individual: 400
        };
        return base[type] + this.difficultyLevel * (type === 'government' ? 200 : 150);
    }

    calculateDuration(type) {
        const base = {
            government: 45000,
            enterprise: 40000,
            individual: 30000
        };
        return base[type] - (this.difficultyLevel * 2000);
    }

    generateCondition() {
        const axes = ['political', 'emotional', 'practical'];
        const conditions = [];
        
        // 50%概率生成双条件
        const conditionCount = Math.random() > 0.5 ? 2 : 1;
        for(let i = 0; i < conditionCount; i++) {
            const axis = axes[Math.floor(Math.random()*axes.length)];
            const threshold = 40 + this.difficultyLevel * 10;
            const comparison = Math.random() > 0.5 ? '≥' : '≤';
            conditions.push(`${axis} ${comparison} ${threshold}`);
        }
        
        return conditions.join(' && ');
    }

    renderDemand(demand) {
        const container = document.getElementById('demand-queue');
        const client = this.clientTypes[demand.type];
        const card = document.createElement('div');
        card.className = 'demand-card';
        card.dataset.demandId = demand.id;
        
        card.innerHTML = `
            <div class="client-info">
                <img src="${client.icon}" class="client-icon">
                <strong>${client.name}</strong>
            </div>
            <div class="demand-desc">${client.descs[Math.floor(Math.random()*client.descs.length)]}</div>
            <div class="demand-condition">要求：${this.formatCondition(demand.condition)}</div>
            <div class="reward">报酬：$${demand.reward}</div>
            <div class="expire-time">剩余：${Math.round((demand.expires - Date.now())/1000)}秒</div>
        `;

        const updateTimer = () => {
            if(this.isPaused || this.isEnding) return;
            
            const remain = Math.max(0, Math.round((demand.expires - Date.now())/1000));
            card.querySelector('.expire-time').textContent = `剩余：${remain}秒`;
            
            if(remain <= 0) {
                this.showTimeoutFeedback(client);
                this.removeDemand(demand.id);
                clearInterval(timer);
            }
        };
        const timer = setInterval(updateTimer, 1000);
        this.activeTimers.push(timer);
        updateTimer();

        container.appendChild(card);
    }

    setupDemandHandling() {
        const demandQueue = document.getElementById('demand-queue');
        
        demandQueue.addEventListener('dragover', e => {
            e.preventDefault();
        });

        demandQueue.addEventListener('drop', e => {
            e.preventDefault();
            const aiId = e.dataTransfer.getData('text/plain');
            const ai = this.generatedAIs.find(a => a.id === aiId);
            const demandCard = e.target.closest('.demand-card');
            
            if(demandCard && ai) {
                const demandId = demandCard.dataset.demandId;
                const demand = this.activeDemands.find(d => d.id == demandId);
                
                if(this.checkCondition(ai, demand.condition)) {
                    this.stats.coin.value += demand.reward;
                    this.showAIDialogue([], false, `协议验证通过 (+$${demand.reward})`);
                    this.removeDemand(demandId);
                    this.removeAI(aiId);
                } else {
                    this.showAIDialogue([], true);
                }
                this.updateStatus();
            }
        });
    }

    checkCondition(ai, condition) {
        try {
            const conditions = condition.split(' && ');
            return conditions.every(cond => {
                const [axis, comparison, value] = cond.split(' ');
                const aiValue = ai[axis];
                if(comparison === '≥') return aiValue >= value;
                if(comparison === '≤') return aiValue <= value;
                return false;
            });
        } catch {
            return false;
        }
    }

    showAIDialogue(usedMaterials, isFailed = false, customText = '') {
        const bubble = document.getElementById('ai-bubble');
        let dialogue = customText;
        
        if(!dialogue) {
            if(isFailed) {
                dialogue = "错误！协议不兼容...";
            } else {
                const mainAxis = this.getDominantAxis(usedMaterials);
                dialogue = this.getUniqueDialogue(mainAxis);
            }
        }
        
        bubble.textContent = dialogue;
        const responseUI = document.getElementById('ai-response');
        responseUI.classList.remove('hidden');
        setTimeout(() => responseUI.classList.add('hidden'), 3000);
    }

    getDominantAxis(materials) {
        const sums = { political:0, emotional:0, practical:0 };
        materials.forEach(m => {
            Object.keys(m.effect).forEach(k => {
                if(sums[k] !== undefined) sums[k] += Math.abs(m.effect[k]);
            });
        });
        return Object.entries(sums).sort((a,b) => b[1]-a[1])[0][0];
    }

    getUniqueDialogue(axis) {
        const pool = this.aiDialogues[axis];
        let phrase;
        do {
            phrase = pool[Math.floor(Math.random()*pool.length)];
        } while(this.usedPhrases.has(phrase));
        
        this.usedPhrases.add(phrase);
        if(this.usedPhrases.size > 5) this.usedPhrases.delete([...this.usedPhrases][0]);
        return phrase;
    }

    showTimeoutFeedback(client) {
        const feedback = client.feedbacks[Math.floor(Math.random()*client.feedbacks.length)];
        this.showAIDialogue([], false, feedback);
    }

    removeDemand(id) {
        this.activeDemands = this.activeDemands.filter(d => d.id !== id);
        const element = document.querySelector(`[data-demand-id="${id}"]`);
        if(element) element.remove();
    }

    removeAI(id) {
        this.generatedAIs = this.generatedAIs.filter(a => a.id !== id);
        const element = document.querySelector(`[data-ai-id="${id}"]`);
        if(element) element.remove();
    }

    updateStatus() {
        document.querySelectorAll('.resource').forEach(container => {
            const type = container.dataset.type;
            const data = this.stats[type];
            
            container.querySelector('.type-icon').src = `assets/ui/${data.icon}`;
            container.querySelector('.value').textContent = data.value;
            container.querySelector('.label').textContent = data.label;
        });
    }

    updateFacialIcons() {
        document.querySelectorAll('.resource').forEach(el => {
            const type = el.dataset.type;
            const value = this.stats[type].value;
            const icon = el.querySelector('.status-icon');
            
            let face = 'happy';
            if(type === 'biohazard') {
                if(value >= 70) face = 'sad';
                else if(value >= 30) face = 'neutral';
            } else {
                if(value <= 30) face = 'sad';
                else if(value <= 70) face = 'neutral';
            }
            
            icon.src = `assets/ui/face_${face}.png`;
        });
    }

    checkEnding() {
        if(this.stats.biohazard.value >= 100) {
            this.showEnding('数据污染', '神经网络被黑色粘液彻底侵蚀...');
        } else if(this.stats.coin.value >= 5000) {
            this.showEnding('资本共生', '你成为了系统最完美的寄生体');
        } else if(this.stats.brain.value <= 0) {
            this.showEnding('意识解体', '最后的理性沉入数据深渊');
        }
    }

    showEnding(title, desc) {
        this.isEnding = true;
        clearInterval(this.demandInterval);
        clearInterval(this.beltInterval);
        this.activeTimers.forEach(timer => clearTimeout(timer));
        document.getElementById('ending-title').textContent = title;
        document.getElementById('ending-description').textContent = desc;
        document.getElementById('ending-screen').classList.remove('hidden');
    }

    showTooltip(x, y, text, isBottom) {
        const tooltip = document.querySelector('.tooltip');
        tooltip.textContent = text;
        tooltip.style.left = `${x}px`;
        
        if(isBottom) {
            tooltip.style.top = `${y + 20}px`;
            tooltip.classList.add('bottom-tip');
        } else {
            tooltip.style.top = `${y - 40}px`;
            tooltip.classList.remove('bottom-tip');
        }
        
        tooltip.style.opacity = '1';
    }

    showResourceTooltip(e) {
        const type = e.currentTarget.dataset.type;
        const value = this.stats[type].value;
        let desc = '';
        
        switch(type) {
            case 'coin':
                desc = value >= 70 ? '金币的碰撞声编织成权力的蛛网' : 
                       value >= 30 ? '铜臭味开始腐蚀道德准绳' : '贫穷是最大的道德困境';
                break;
            case 'brain':
                desc = value >= 70 ? '清醒是痛苦的奢侈品' : 
                       value >= 30 ? '现实与数据的界限开始模糊' : '记忆碎片在神经突触间漂流';
                break;
            case 'biohazard':
                desc = value >= 70 ? '数据毒株正在吞噬理性' : 
                       value >= 30 ? '黑色粘液在代码底层滋生' : '清洁协议运转正常';
                break;
        }
        
        this.showTooltip(e.clientX, e.clientY, `${desc}（当前值：${value}）`, true);
    }

    hideTooltip() {
        document.querySelector('.tooltip').style.opacity = '0';
    }

    formatCondition(cond) {
        const map = {
            political: '政治倾向',
            emotional: '情感浓度',
            practical: '实用价值',
            '>': '≥',
            '<': '≤'
        };
        return cond.replace(/(\w+)( [<>] )(\d+)/, (_, a, b, c) => 
            `${map[a]} ${map[b.trim()]} ${c}`
        );
    }

    resumeDemandTimer(demand) {
        const remainingTime = demand.expires - Date.now();
        if(remainingTime > 0) {
            const timer = setTimeout(() => {
                this.showTimeoutFeedback(this.clientTypes[demand.type]);
                this.removeDemand(demand.id);
            }, remainingTime);
            this.activeTimers.push(timer);
        }
    }

    createParticles(container) {
        const particles = document.createElement('div');
        particles.className = 'particle-effect';
        for(let i=0; i<30; i++) {
            const dot = document.createElement('div');
            dot.className = 'particle';
            dot.style.left = `${Math.random()*100}%`;
            dot.style.top = `${Math.random()*100}%`;
            dot.style.animationDelay = `${Math.random()*0.5}s`;
            particles.appendChild(dot);
        }
        container.appendChild(particles);
        setTimeout(() => particles.remove(), 1000);
    }
}

window.onload = () => new Game();
