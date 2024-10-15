<script setup lang="ts">
import {ref} from "vue";
import GenieEazy from "@/components/genieEazy.vue";

const skills = ref([
  { name: '神秘力量', attribute: '石' },
  { name: '光刺炮', attribute: '石' },
  { name: '沙石暴', attribute: '石' },
  { name: '天崩地裂', attribute: '土' },
  { name: '失明', attribute: '光' },
  { name: '口吐冰莲', attribute: '龙' },
  { name: '龙威', attribute: '龙' },
  { name: '扫尾', attribute: '龙' },
  { name: '升龙咆哮', attribute: '龙' },
  { name: '糖果屋', attribute: '萌' },
  { name: '死亡来临', attribute: '萌' },
  { name: '混乱审判', attribute: '萌' },
  { name: '妖狐之魅', attribute: '萌' },
  { name: '极度深寒', attribute: '冰' },
  { name: '双萝卜兔超标技能', attribute: '草' },
  { name: '先强化后输出技能(如魔焰瞬击)', attribute: '' },
  { name: '催眠技能', attribute: ''},
])

const poisons = ref([
  { name: '树枝剧毒', attribute: '草' },
  { name: '麻醉粉', attribute: '草' },
  { name: '电磁之波', attribute: '电' },
  { name: '电磁巨炮', attribute: '电' },
  { name: '电磁脉冲', attribute: '电' }
])

const NBskills = ref([
  { name: '宁神', attribute: '幽灵' },
  { name: '鬼影缠身', attribute: '幽灵' },
  { name: '金属噪音', attribute: '机械' },
  { name: '冰晶结界', attribute: '冰' },
  { name: '恶魔之盾', attribute: '恶魔' }
])

const status = ref([
  {name: '迷惑', pic: 's1.png'},
  {name: '催眠', pic: 's2.png'},
  {name: '恐惧', pic: 's3.png'},
])
</script>

<route lang="yaml">
  meta:
    layout: home
</route>

<template>
  <div class="top">
    <div class="top_box">
      <div class="top_box_c1"></div>
      <div class="top_box_c2"></div>
      <div class="top_box_main">
        <div style="display: flex;flex-wrap: wrap;width: 100%;margin-top: 20px">
          <div style="width: 50%;">
            <Title name="禁用范围"/>
            <div style="width: 80%;margin: 10px 10% 10px">
              <div style="display: flex">
                <div style="color: #69c0ff;font-size: 17px;">技能禁用</div>
                <div style="display: flex;flex: 1;flex-wrap: wrap;margin-left: 10px;margin-top: -3px">
                  <template v-for="skill in skills">
                    <div style="margin: 3px 5px;display: flex;align-items: center;font-size: 15px">
                      <img :src="'../../public/' + skill.attribute + '.png'" style="margin-right: 3px;height: 20px" v-if="skill.attribute != ''">
                      <span v-if="skill.attribute != ''">{{skill.name}}</span>
                      <span v-if="skill.attribute == ''" style="color: #ff5859">{{skill.name}}</span>
                    </div>
                  </template>
                </div>
              </div>
              <div style="display: flex;margin-top: 10px">
                <div style="color: #69c0ff;font-size: 17px;">状态禁用</div>
                <div style="display: flex;flex: 1;flex-wrap: wrap;margin-left: 10px;margin-top: -3px">
                  <template v-for="s in status">
                    <div style="margin: 3px 5px;display: flex;align-items: center;font-size: 15px">
                      <img :src="'../../public/' + s.pic" style="margin-right: 3px;height: 20px">
                      <span>{{s.name}}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 50%;height: 80px;display: flex;flex-direction: column;align-items: center">
            <Title name="对战须知"/>
            <div style="display: flex;flex-direction: column;margin-top: 10px;">
              <div style="display: flex;">
                <div style="color: #69c0ff;font-size: 17px;margin-right: 10px">禁用要求</div>
                <div>
                  <div>
                    禁用<span style="color: #ff5859">辅助透视</span>和<span style="color: #ff5859">官方自带透视</span>
                  </div>
                  <div style="display: flex;align-items: center">
                      禁止使用<span style="color: #ff5859">任何药剂</span>
                      <img src="../../../public/pill1.png" style="height: 36px">
                      <img src="../../../public/pill2.png" style="height: 36px">
                  </div>
                </div>
              </div>
              <div style="display: flex">
                <div style="color: #69c0ff;font-size: 17px;margin-right: 10px">装备携带</div>
                <div>
                  无努力值加点可携带最多两个64加点及以下装备
                  <div style="margin: 8px 0">
                    满精力/速度的半培育宠物可携带一个装备
                  </div>
                  <div style="display: flex;align-items: center">
                    <img src="../../../public/equip1.png" style="height: 38px">
                    <img src="../../../public/equip2.png" style="height: 38px;margin: 0 8px">
                    <img src="../../../public/equip3.png" style="height: 38px">
                    <img src="../../../public/equip4.png" style="height: 38px;margin-left: 8px">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 50%;display: flex;flex-direction: column;align-items: center;margin-top: 20px">
            <Title name="技能限制"/>
            <div>
              <div style="display: flex;">
                一、高概率（50%以上）麻醉技能上限1个
              </div>
              <div style="display: flex;flex-wrap: wrap;margin-left: 26px">
                <template v-for="p in poisons">
                  <div style="margin: 3px 5px;display: flex;align-items: center;font-size: 15px">
                    <img :src="'../../public/' + p.attribute + '.png'" style="margin-right: 3px;height: 20px">
                    <span>{{p.name}}</span>
                  </div>
                </template>
              </div>
              <div style="margin-top: 3px;display: flex;align-items: center">
                二、
                <img src="../../../public/幽灵.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                宁神
                限制<span style="color: #ff5859">一强</span>
              </div>
              <div style="display: flex;align-items: center;margin-top: 3px">
                三、
                <img src="../../../public/龙.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                龙之舞/引导术 限制<span style="color: #ff5859">两强</span>
              </div>
              <div style="margin-top: 3px;display: flex;align-items: center">
                四、
                <img src="../../../public/武斗.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                健步、
                <img src="../../../public/冰.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                冰天雪地二选一携带（固伤类）
              </div>
              <div style="margin-top: 3px;display: flex;align-items: center">
                五、
                <img src="../../../public/幽灵.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                宁神、
                <img src="../../../public/恶魔.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                巨魔之眼二选一携带（生存类）
              </div>
              <div style="margin-top: 3px;display: flex;align-items: center">
                六、
                <img src="../../../public/幽灵.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                鬼影缠身、
                <img src="../../../public/机械.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                金属噪音二选一携带（降抗类）
              </div>
              <div style="margin-top: 3px;display: flex;align-items: center">
                七、
                <img src="../../../public/龙.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                龙之舞、
                <img src="../../../public/普通.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                守护之力、
                <img src="../../../public/草.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                <img src="../../../public/电.png" style="height: 20px;margin-right: 3px;margin-top: 2px">
                高概率麻醉三选一携带
              </div>
              <div style="margin-top: 3px">
                八、强度超标技能携带各上限1个
              </div>
              <div style="display: flex;flex-wrap: wrap;margin-left: 26px">
                <template v-for="p in NBskills">
                  <div style="margin: 3px 5px;display: flex;align-items: center;font-size: 15px">
                    <img :src="'../../public/' + p.attribute + '.png'" style="margin-right: 3px;height: 20px">
                    <span>{{p.name}}</span>
                  </div>
                </template>
              </div>
              <div style="margin-top: 3px">
                九、<span style="color: #ff5859">单只宠物</span>
                高概率麻醉、稳定强化技能二选一
              </div>
            </div>
          </div>
          <div style="width: 50%;height: 80px;display: flex;align-items: center;flex-direction: column;margin-top: 20px">
            <Title name="强度限制"/>
            <div style="display: flex;justify-content: center;">
              <div>
                <div style="display: flex;align-items: center">
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="蓝衣夜灵" attribute="石"/>
                    禁用
                    <img src="../../../public/龙.png" style="height: 20px;margin-right: 3px;margin-top: 2px;margin-left: 5px">
                    龙之舞
                  </div>
                </div>
                <div style="display: flex;align-items: center">
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="暴角龙" attribute="石"/>
                    禁用
                    <img src="../../../public/机械.png" style="height: 20px;margin-right: 3px;margin-top: 2px;margin-left: 5px">
                    金刚菲比
                  </div>
                </div>
                <div style="display: flex;align-items: center">
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="无敌胖胖猪" attribute="石" style="transform: scale(0.75)"/>
                    禁用
                    <img src="../../../public/石.png" style="height: 20px;margin-right: 3px;margin-top: 2px;margin-left: 5px">
                    提气术
                  </div>
                </div>
                <div style="display: flex;align-items: center;margin-top: -5px">
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="云雾犬" attribute="恶魔" style=";margin-bottom: 5px;margin-left: 5px"/>
                    <div style="margin-left: -5px">禁用</div>
                    <img src="../../../public/恶魔.png" style="height: 20px;margin-right: 3px;margin-top: 2px;margin-left: 5px">
                    恶魔之盾
                  </div>
                </div>
                <div style="display: flex;align-items: center">
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="帕尔萨斯" attribute="恶魔" style="margin-top: -10px"/>
                    、
                    <GenieEazy name="幽游娃娃" attribute="幽灵" style="margin-left: -6px"/>
                    禁用
                    <img src="../../../public/幽灵.png" style="height: 20px;margin-right: 3px;margin-top: 2px;margin-left: 5px">
                    宁神
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="鸭吉吉" attribute="翼"/>
                    风之打击
                    乾坤一掷
                    风之保护
                    三选二
                  </div>
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="恶魔战士" attribute="恶魔"/>
                    恶魔之盾
                    巨魔之眼
                    冰天雪地
                    三选二
                  </div>
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="神圣人鱼" attribute="水"/>
                    冰晶结界/冰冻打击
                    死亡之音
                    二选一
                  </div>
                  <div style="display: flex;align-items: center">
                    <GenieEazy name="石敢当" attribute="土"/>
                    大地宽恕
                    提气术
                    二选一
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%;margin-top: 20px;padding-left: 5%">
            <div style="display: flex;justify-items: center;align-items: center;flex-direction: column;color: #69c0ff">
              <div style="font-size: 17px;margin-top: 2px">附录：有培花瓶PK宠物范围</div>
              <div style="display: flex;align-items: center;justify-items: center;">
                <div style="height: 2px;width: 120px;background: #69c0ff"></div>
                <el-icon style="font-size: 8px;color: #69c0ff"><StarFilled /></el-icon>
                <div style="height: 2px;width: 120px;background: #69c0ff"></div>
              </div>
            </div>
            <div style="margin-top: 10px;display: flex;align-items: center">
              <div style="color: #69c0ff;font-size: 17px;margin-right: 10px">序号范围</div>
              <div>1500序号内花瓶强度宠物
                与
                部分多元进化
                及
                超序号宠物</div>
            </div>
            <div style="margin-top: 10px;display: flex;">
              <div style="color: #69c0ff;font-size: 17px;margin-right: 10px">整体禁用</div>
              <div>
                <div>
                  未开放的超序号宠物 未开放的1100+序号且600+种族值宠物
                </div>
                <div style="margin-top: 8px">
                  未开放的多元进化宠物
                  所有Bug遗传宠物 精灵王一至四阶所有形态
                </div>
              </div>
            </div>
            <div style="margin-top: 10px;display: flex;align-items: center">
              <div style="color: #69c0ff;font-size: 17px;margin-right: 10px">0-1100宠物限制</div>
            </div>
            <div style="margin-top: 10px;display: flex;align-items: center">
              <div style="color: #ff5859;font-size: 17px;margin-right: 10px">宠物禁用</div>
              <div>
                斑点牛牛 幻影 图灵 火云神 赤炎飞龙 超能阿布 技能石先锋君主
              </div>
            </div>
            <div style="margin-top: 10px;display: flex;align-items: center">
              <div style="color: #90d790;font-size: 17px;margin-right: 10px">宠物开放</div>
              <div>
                绅士鸡 梦幻卡洛儿 巨翎天鹅 奇丽果 神圣人鱼 海豚乐乐 海豚族长(多元进化宠物)
              </div>
            </div>
            <div style="margin-top: 10px;display: flex;align-items: center">
              <div style="color: #69c0ff;font-size: 17px;margin-right: 10px">1100-1500可用宠物</div>
            </div>
            <div style="margin-top: 10px;display: flex;align-items: center">
              <div style="color: #ff5859;font-size: 17px;margin-right: 10px">宠物禁用</div>
              <div>
                幽灵冰姬 艾米 火魔一至四阶所有形态 粉钻兔兔 雷瓦汀 冈尼尔 妙尔尼尔 月夜行者              </div>
            </div>
            <div style="margin-top: 10px;display: flex;">
              <div style="color: #90d790;font-size: 17px;margin-right: 10px">宠物开放</div>
              <div style="display: flex;flex-wrap: wrap;width: 80%">
                600种族值以下花瓶强度宠物
                炮塔瓢虫 魔环飞飞 烟斗船长 皇冠豚豚 绿萝魔灵 冰霜狼王 飞天翼豹
                百花仙女 万寿芝灵 鹦鹉哨 鳄鱼警督 超能丘比特
              </div>
            </div>

            <div style="margin-top: 10px;display: flex;align-items: center">
              <div style="color: #69c0ff;font-size: 17px;margin-right: 10px">1500+宠物限制</div>
            </div>

            <div style="margin-top: 10px;display: flex;">
              <div style="color: #90d790;font-size: 17px;margin-right: 10px">宠物开放</div>
              <div style="display: flex;flex-wrap: wrap;width: 80%">
                友谊天使 萌蛋考拉 飞天刀螂 妖艳汤姆 机械柯基 正义之狮 岩浆犀牛 聚福红包 藏宝图大副
                闪亮烟花
                北舞南狮 福气羊仔 金桑羊 深海神牛 恶魔小丑 水元素 无羁水元素 火元素 无羁火元素
                蛋蛋爷爷 双臂鱼 鸭老大 认输猴(超序号较多500种族值以下花瓶强度宠物未列入，均酌情使用)              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="top_box_c2"></div>
      <div class="top_box_c1"></div>
    </div>
  </div>
</template>

<style scoped>

</style>