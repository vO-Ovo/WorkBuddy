/**
 * 广东全省医疗设备招标信息汇总平台 — 公告数据（真实数据，定时扩充，覆盖全省 21 个地级市）
 *
 * 数据来自 汕头 / 潮州 两地公开发布的医疗设备招投标公告，经联网检索整理；
 * 每条均附「原始公告链接」（sourceUrl），点击可在新标签页打开对应的官方公告详情页。
 *
 * 字段：id / title / region(所属地区) / category(设备类别) / type(公告类型)
 *       budget(预算金额，单位：元；调研类未披露填 0，界面显示「—」)
 *       publishDate(YYYY-MM-DD) / sourceUrl(原始公告链接)
 *
 * DATA_UPDATED：数据最后更新日期（由定时检索任务刷新）。
 * 检索来源覆盖：中国政府采购网(ccgp.gov.cn)、广东省政府采购网(gdgpo.czt.gd.gov.cn)、
 * 采联集团(chinapsp.cn)、国义招标(ebidding.com / gmgitc.com)、汕头/潮州各医院官网等。
 */

var DATA_UPDATED = '2026-07-29';

var ANNOUNCEMENTS = [
  // ===== 汕头市 · 彩超/超声设备 =====
  { id: 1,  title: '汕头市中心医院医疗设备更新项目(二)(2026) 彩色多普勒超声诊断系统(F) 招标公告', region: '汕头市', category: '彩超·超声设备', type: '招标公告', budget: 1981000, publishDate: '2026-01-29', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202601/t20260129_26132466.htm' },
  { id: 2,  title: '汕头市潮阳区大峰医院医疗设备招标采购项目 高端彩色多普勒诊断仪A/B 招标公告', region: '汕头市', category: '彩超·超声设备', type: '招标公告', budget: 3700000, publishDate: '2026-05-22', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260522_26616796.htm' },
  { id: 13, title: '汕头大学医学院第二附属医院 2026年度医疗设备采购项目调研公告(2026-SBDY-12) 便携式彩色多普勒超声', region: '汕头市', category: '彩超·超声设备', type: '调研·论证公告', budget: 390000, publishDate: '2026-03-17', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24363.html' },
  { id: 30, title: '汕头市澄海区人民医院高端彩色多普勒超声诊断仪等设备采购项目(三次) 招标公告', region: '汕头市', category: '彩超·超声设备', type: '招标公告', budget: 169000, publishDate: '2025-12-26', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202512/t20251226_25998041.htm' },

  // ===== 汕头市 · 内窥镜类 =====
  { id: 4,  title: '汕头市中心医院纤维支气管镜等设备采购项目 招标公告', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 714000, publishDate: '2026-04-07', sourceUrl: 'https://www.chengezhao.com/cms/post/e/0/e0664d51cbdee5d360c1240bc4576781' },
  { id: 5,  title: '汕头市澄海区中医医院老年病科(医疗设备)改造提升项目 高清电子胃肠镜系统 招标公告', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 1503000, publishDate: '2026-07-13', sourceUrl: 'https://www.gmgitc.com/BID/BidInfoDetail.aspx?SNID=91774' },
  { id: 6,  title: '汕头市第四人民医院医疗设备市场调研公告（含电子胃肠镜）', region: '汕头市', category: '内窥镜类', type: '调研·论证公告', budget: 0, publishDate: '2026-05-13', sourceUrl: 'https://gdstsy.org.cn/home/view?id=687' },
  { id: 7,  title: '汕头市中心医院纤维支气管镜等设备采购项目 中标公告', region: '汕头市', category: '内窥镜类', type: '中标结果公告', budget: 410200, publishDate: '2026-04-28', sourceUrl: 'https://www.chengezhao.com/cms/post/3/1/315dae64397e8c421ab4f15b4c02dac5' },
  { id: 12, title: '汕头市中心医院医疗设备采购项目采购需求调研（含超声内镜系统）', region: '汕头市', category: '内窥镜类', type: '调研·论证公告', budget: 0, publishDate: '2026-04-10', sourceUrl: 'https://sthospital.com/view_news.aspx?id=8923' },
  { id: 31, title: '汕头市中心医院医疗设备更新项目(三) 内窥镜系统（电子鼻咽喉镜/消化道内镜/支气管镜/腹腔镜胸腔镜）招标公告', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 29220000, publishDate: '2025-11-11', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202511/t20251111_25677207.htm' },
  { id: 32, title: '汕头大学医学院第二附属医院 内窥镜摄像系统(电子鼻咽喉镜)采购项目 公开招标公告', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 890000, publishDate: '2026-05-19', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24451.html' },

  // ===== 汕头市 · 其他设备（招标/中标/调研）=====
  { id: 9,  title: '汕头市中心医院医疗设备更新项目(四)(二次) 结果公告（三维心脏电生理标测系统/眼底激光/全自动生化）', region: '汕头市', category: '其他设备', type: '中标结果公告', budget: 5117000, publishDate: '2026-02-28', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202602/t20260228_26205551.htm' },
  { id: 10, title: '汕头大学医学院第二附属医院超声乳化和玻璃体切除系统采购项目 结果公告', region: '汕头市', category: '其他设备', type: '中标结果公告', budget: 1436000, publishDate: '2026-06-17', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202606/t20260617_26766094.htm' },
  { id: 11, title: '汕头市中心医院中央遥测监护系统采购及脉动真空灭菌器维保 中标公示', region: '汕头市', category: '其他设备', type: '中标结果公告', budget: 444600, publishDate: '2026-06-30', sourceUrl: 'https://www.gdmede.com.cn/announcement/device/detail?id=2071897022682923010' },
  { id: 29, title: '汕头市公共卫生医学中心新建项目设备采购（变更清单第一批次）招标公告（256排CT/移动DR/椎间孔镜等）', region: '汕头市', category: '其他设备', type: '招标公告', budget: 35958040, publishDate: '2026-03-24', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202603/t20260324_26310406.htm' },
  { id: 27, title: '汕头市公共卫生医学中心新建项目设备采购（变更清单第二批次）医疗设备项目调研公告', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2026-07-07', sourceUrl: 'https://www.chinapsp.cn/notice_content.html?itemid=9E6C6CD6-584B-4C56-98E1-503ECEB82444' },
  { id: 28, title: '汕头市公共卫生医学中心新建项目设备采购（变更清单第二批次）需求调研公告', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2026-07-10', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=2075513158431354881' },

  // ===== 汕头市 · 汕头中心医院官网（用户 Edge 收藏夹补充）=====
  { id: 33, title: '汕头市中心医院医疗设备招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2025-05-28', sourceUrl: 'https://www.sthospital.com/view_news.aspx?id=8587' },
  { id: 34, title: '汕头市中心医院医疗设备采购项目采购需求调研', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2026-01-12', sourceUrl: 'https://www.sthospital.com/view_news.aspx?id=8841' },
  { id: 35, title: '汕头市中心医院医疗设备招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-06-17', sourceUrl: 'https://www.sthospital.com/view_news.aspx?id=8984' },

  // ===== 潮州市 · 彩超/超声设备 =====
  { id: 19, title: '潮州市人民医院医疗设备提升项目(彩超) 招标公告', region: '潮州市', category: '彩超·超声设备', type: '招标公告', budget: 14300000, publishDate: '2026-02-24', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202602/t20260224_26191854.htm' },
  { id: 20, title: '潮州市人民医院医疗设备提升项目(彩超) 中标公告', region: '潮州市', category: '彩超·超声设备', type: '中标结果公告', budget: 13114000, publishDate: '2026-03-19', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202603/t20260319_26291621.htm' },
  { id: 17, title: '潮州市人民医院采购便携式彩色多普勒超声系统项目 需求调研公告', region: '潮州市', category: '彩超·超声设备', type: '调研·论证公告', budget: 0, publishDate: '2026-04-03', sourceUrl: 'https://gd.qianlima.com/zbcontent-587035872.html' },
  { id: 18, title: '潮州市人民医院医疗设备提升项目(彩超) 需求调研更正公告', region: '潮州市', category: '彩超·超声设备', type: '调研·论证公告', budget: 0, publishDate: '2026-01-29', sourceUrl: 'https://wx.jianyu360.cn/nologin/content/SEEY1xrfy4_Oyk4AllxcFwoCycCFjJ0V3h0Px5QLyEeeFRzcV5UCiI.html' },
  { id: 58, title: '潮州市中心医院彩色超声诊断仪采购项目 中标公告（便携/高端全身/腹部彩超）', region: '潮州市', category: '彩超·超声设备', type: '中标结果公告', budget: 7815200, publishDate: '2025-11-12', sourceUrl: 'https://www.gmgitc.com/BID/BidResultDetail?ID=0724-2531ST395298%7C2025/11/12%7C/01/04/02/03%7C102558' },
  { id: 59, title: '彩色多普勒超声诊断仪、麻醉机等医疗设备采购项目 中标公告', region: '潮州市', category: '彩超·超声设备', type: '中标结果公告', budget: 3230000, publishDate: '2025-11-17', sourceUrl: 'http://www.czzhengde.com/ReadNews.asp?NewsID=4566' },

  // ===== 潮州市 · 内窥镜类 =====
  { id: 14, title: '潮州市人民医院医疗设备提升项目(高清内窥镜系统及配套电子内镜) 中标公告', region: '潮州市', category: '内窥镜类', type: '中标结果公告', budget: 4950000, publishDate: '2026-03-18', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202603/t20260318_26285758.htm' },
  { id: 15, title: '潮州市人民医院内窥镜等设备采购项目(重招) 中标结果公告', region: '潮州市', category: '内窥镜类', type: '中标结果公告', budget: 301000, publishDate: '2026-07-10', sourceUrl: 'https://www.gmgitc.com/BID/BidResultDetail.aspx?ID=0724-2630ST822681%E9%87%8D1%7C2026%2F07%2F10%7C01%7C109355' },
  { id: 16, title: '潮州市湘桥区妇幼保健院宫腔镜系统配套提升项目 中标公告', region: '潮州市', category: '内窥镜类', type: '中标结果公告', budget: 615000, publishDate: '2026-05-26', sourceUrl: 'https://www.zhaobiaocn.com/info_2_279068.html' },
  { id: 26, title: '潮州市人民医院内窥镜等设备采购项目 需求调研公告', region: '潮州市', category: '内窥镜类', type: '调研·论证公告', budget: 0, publishDate: '2026-03-13', sourceUrl: 'https://www.yiliaozhaobiao.com/news-cafac1a58be52a7294ca1a131d19ba35' },

  // ===== 潮州市 · 其他设备（中标）=====
  { id: 21, title: '潮州市人民医院医疗设备提升项目(医用磁共振成像系统/电子计算机X线断层扫描系统) 中标公告', region: '潮州市', category: '其他设备', type: '中标结果公告', budget: 34780000, publishDate: '2026-03-26', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202603/t20260326_26321221.htm' },
  { id: 22, title: '潮州市湘桥区人民医院血液净化设备及配套医疗设备、血透管理软件 中标公告', region: '潮州市', category: '其他设备', type: '中标结果公告', budget: 3662250, publishDate: '2026-05-13', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202605/t20260513_26562664.htm' },
  { id: 23, title: '潮州市人民医院妇科LEEP手术系统等设备采购项目 中标公示', region: '潮州市', category: '其他设备', type: '中标结果公告', budget: 265000, publishDate: '2026-06-16', sourceUrl: 'https://www.gdmede.com.cn/prArticle?id=2066845883855831042' },
  { id: 24, title: '潮州市中心医院康复一体化设备(第一期)采购项目(二次) 中标公告', region: '潮州市', category: '其他设备', type: '中标结果公告', budget: 7926000, publishDate: '2026-01-14', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?id=7b18d3af-2eb0-4ab9-8473-232dea1a4636' },
  { id: 25, title: '潮州市中心医院三维电生理标测系统采购项目 中标公告', region: '潮州市', category: '其他设备', type: '中标结果公告', budget: 1944600, publishDate: '2026-04-23', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202604/t20260423_26449371.htm' },

  // ===== 用户 Edge「招标调研公告」收藏夹补充（汕头/潮州两地）=====
  { id: 36, title: '汕头大学医学院第二附属医院2025年度医疗设备政府采购项目调研公告（2025-SBDY-06）', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2025-03-26', sourceUrl: 'https://www.st120.cn/NewsDetail/84/21594.html?fol=MedicalProfile' },
  { id: 37, title: '汕头市第二人民医院采购医疗设备维保服务招标项目招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 840000, publishDate: '2025-04-11', sourceUrl: 'https://www.gmgitc.com/Bid/BidInfoDetail?SNID=82426' },
  { id: 38, title: '汕头市第二人民医院医疗设备采购咨询公告（2025-1）', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2025-04-14', sourceUrl: 'https://www.st2yy.com.cn/html/content.html?id=2063' },
  { id: 39, title: '汕头市中心医院医疗设备更新项目（之三）需求调研公告（内窥镜/腹腔镜）', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2025-07-14', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=1944744310629474305' },
  { id: 40, title: '汕头市中心医院医疗设备更新项目（之二）需求调研公告（彩色多普勒超声诊断系统A-I）', region: '汕头市', category: '彩超·超声设备', type: '调研·论证公告', budget: 0, publishDate: '2025-07-14', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=1944744311606747138' },
  { id: 41, title: '广东省重点医院先进医疗设备更新项目（粤东、粤西）—3D腹腔镜系统招标公告', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 2100000, publishDate: '2025-07-15', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?type=notice&id=db699b69-6838-483e-84df-7732e673073c&channel=fca71be5-fc0c-45db-96af-f513e9abda9d&noticeType=001011&openTenderCode=GPCGD253174HG203F&channelName=%E9%A1%B9%E7%9B%AE%E9%87%87%E8%B4%AD%E5%85%AC%E5%91%8A&path=%2FnoticeInformationGd' },
  { id: 42, title: '汕头市潮阳区大峰医院医疗设备采购市场调研公告', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2025-08-01', sourceUrl: 'https://stsdfyy.com/index/anno/read/id/67' },
  { id: 43, title: '汕头市潮阳区中医院异地新建提升工程医疗设备采购项目采购需求征求意见公告', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2025-08-18', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?type=notice&id=c876fb69-bbb4-4f5f-b4cf-7d6a0b3252fe&channel=fca71be5-fc0c-45db-96af-f513e9abda9d&noticeType=001059&openTenderCode=%E6%97%A0&channelName=%E9%A1%B9%E7%9B%AE%E9%87%87%E8%B4%AD%E5%85%AC%E5%91%8A&path=%2FnoticeInformationGd' },
  { id: 44, title: '病理科设备采购项目招标公告', region: '潮州市', category: '其他设备', type: '招标公告', budget: 1173000, publishDate: '2025-08-19', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?type=notice&id=3aff837f-55de-4db5-9270-1a321db98df4&channel=fca71be5-fc0c-45db-96af-f513e9abda9d&noticeType=001011&openTenderCode=GX2025ZH0005&channelName=%E9%A1%B9%E7%9B%AE%E9%87%87%E8%B4%AD%E5%85%AC%E5%91%8A&path=%2FnoticeInformationGd' },
  { id: 45, title: '听力计（含隔音室）、医用内窥镜附属设备采购项目需求公示(2025-JHLZYY-W3036)', region: '潮州市', category: '内窥镜类', type: '调研·论证公告', budget: 490000, publishDate: '2025-07-22', sourceUrl: 'https://www.plap.mil.cn/freecms/site/juncai/ggxx/info/2025/8a1d046897c5d0dc01982b10f7896cb6.html?noticeType=00105E' },
  { id: 46, title: '汕头大学医学院第二附属医院采购高清电子消化道内镜系统招标项目（0724-2531ST646518）', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 2250000, publishDate: '2025-09-25', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?type=notice&id=62affd57-ed12-4d4a-aca4-849b253e2169&channel=fca71be5-fc0c-45db-96af-f513e9abda9d&noticeType=001011&openTenderCode=0724-2531ST646518&channelName=%E9%A1%B9%E7%9B%AE%E9%87%87%E8%B4%AD%E5%85%AC%E5%91%8A&path=%2FnoticeInformationGd' },
  { id: 47, title: '潮州市中心医院采购电子内镜及设备维保服务项目招标公告（0724-2531ST397402）', region: '潮州市', category: '内窥镜类', type: '招标公告', budget: 2250000, publishDate: '2025-10-30', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?type=notice&id=d9aab497-7226-4906-9db2-f9ec60cbb1db&channel=fca71be5-fc0c-45db-96af-f513e9abda9d&noticeType=001011&openTenderCode=0724-2531ST397402&channelName=%E9%A1%B9%E7%9B%AE%E9%87%87%E8%B4%AD%E5%85%AC%E5%91%8A&path=%2FnoticeInformationGd' },
  { id: 48, title: '潮州市中心医院高清电子鼻咽喉镜系统及配套采购前调研公告（潮中心采调2025-1201）', region: '潮州市', category: '内窥镜类', type: '调研·论证公告', budget: 0, publishDate: '2025-12-05', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=1996868174304202753' },
  { id: 49, title: '潮州市中心医院内镜摄像系统采购前调研公告（潮中心采调2025-1203）', region: '潮州市', category: '内窥镜类', type: '调研·论证公告', budget: 0, publishDate: '2025-12-05', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=1996868176632041474' },
  { id: 50, title: '潮州市人民医院医疗设备提升项目（彩超3套）需求调研公告', region: '潮州市', category: '彩超·超声设备', type: '调研·论证公告', budget: 0, publishDate: '2026-01-27', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=2016365085173628930' },
  { id: 51, title: '汕头市中医医院采购泌尿外科手术设备项目招标公告（0724-2531ST640266）', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 3160000, publishDate: '2026-02-09', sourceUrl: 'https://www.gmgitc.com/Bid/BidInfoDetail?SNID=89038' },
  { id: 52, title: '潮州市人民医院医疗设备提升项目（高清内窥镜系统及配套电子内镜）招标公告（0724-2631ST820966）', region: '潮州市', category: '内窥镜类', type: '招标公告', budget: 4980000, publishDate: '2026-02-24', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?type=notice&id=7cd03dc8-f1db-46d7-ba28-31d9d33a7f81&channel=fca71be5-fc0c-45db-96af-f513e9abda9d&openTenderCode=0724-2631ST820966&channelName=%E9%87%87%E8%B4%AD%E9%A1%B9%E7%9B%AE%E4%BF%A1%E6%81%AF' },
  { id: 53, title: '潮州市人民医院医疗设备提升项目(彩超)招标公告（0724-2631ST820970）', region: '潮州市', category: '彩超·超声设备', type: '招标公告', budget: 14300000, publishDate: '2026-02-24', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?type=notice&id=c77e223c-4096-4259-865a-090b0208bbf5&channel=fca71be5-fc0c-45db-96af-f513e9abda9d&openTenderCode=0724-2631ST820970&channelName=%E9%87%87%E8%B4%AD%E9%A1%B9%E7%9B%AE%E4%BF%A1%E6%81%AF' },
  { id: 54, title: '汕头大学医学院第二附属医院2026年度医疗设备采购项目调研公告（2026-SBDY-04，消化内镜）', region: '汕头市', category: '内窥镜类', type: '调研·论证公告', budget: 0, publishDate: '2026-02-27', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24306.html?fol=MedicalProfile' },
  { id: 55, title: '汕头大学医学院第一附属医院医用耗材调研遴选公告(2025-11第三次)', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2026-03-20', sourceUrl: 'https://www.stuh.com.cn/article/detail?id=377&articleId=60410' },
  { id: 56, title: '汕头大学医学院第二附属医院2026年度医疗设备维保项目调研公告（2026-SBDY-15，心脏/全身彩超维保）', region: '汕头市', category: '彩超·超声设备', type: '调研·论证公告', budget: 0, publishDate: '2026-05-20', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24454.html?fol=MedicalProfile' },
  { id: 57, title: '潮州市人民医院采购电子小肠镜等设备项目需求调研公告', region: '潮州市', category: '内窥镜类', type: '调研·论证公告', budget: 0, publishDate: '2026-06-10', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=2064664181373943809' },

  // ===== 2026-07-28 定时检索新增（汕头）=====
  { id: 60, title: '汕头大学医学院第一附属医院动态血压分析系统项目(第二次) 招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-07-10', sourceUrl: 'https://www.cfen.com.cn/zcgg/202607/t20260710_909373.html' },
  { id: 61, title: '汕头市金平区人民医院脉动真空灭菌器采购项目 中标公告', region: '汕头市', category: '其他设备', type: '中标结果公告', budget: 231335, publishDate: '2026-07-13', sourceUrl: 'https://www.chengezhao.com/cms/post/e/c/ecd0d361d81f28c925942af9a1a07ba2' },
  { id: 62, title: '汕头市中心医院医疗设备招标公告（2026年7月）', region: '汕头市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-07-15', sourceUrl: 'https://sthospital.com/view_news.aspx?id=8998' },
  { id: 63, title: '汕头大学医学院第二附属医院制氧机分子筛更换项目 中标公告', region: '汕头市', category: '其他设备', type: '中标结果公告', budget: 0, publishDate: '2026-07-17', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24562.html' },
  { id: 64, title: '汕头大学医学院第二附属医院采购便携式彩色多普勒超声诊断仪及生物反馈胃肠起搏治疗仪招标项目（0724-2630ST644461）招标公告', region: '汕头市', category: '彩超·超声设备', type: '招标公告', budget: 0, publishDate: '2026-07-21', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24569.html' },
  { id: 65, title: '汕头大学医学院第二附属医院采购全自动智能输液分拣机招标项目（0724-2630ST644505）招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-07-21', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24568.html' },
  { id: 66, title: '汕头大学医学院第二附属医院采购全自动动态血沉分析仪及妇产科内窥镜摄像机招标项目（0724-2630ST644512）招标公告', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 0, publishDate: '2026-07-22', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24571.html' },
  { id: 67, title: '汕头大学医学院第二附属医院采购脑血管血流动力学检测仪及可视喉镜招标项目（0724-2630ST644520）招标公告', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 0, publishDate: '2026-07-22', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24570.html' },
  { id: 68, title: '汕头大学医学院第二附属医院心脏彩超维保服务项目（0724-2630ST644609）招标公告', region: '汕头市', category: '彩超·超声设备', type: '招标公告', budget: 0, publishDate: '2026-07-24', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24574.html' },
  { id: 69, title: '汕头大学医学院第二附属医院全身彩超维保项目（CLF0126ST01QY10）公开招标公告', region: '汕头市', category: '彩超·超声设备', type: '招标公告', budget: 360000, publishDate: '2026-07-24', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24575.html' },
  { id: 70, title: '汕头大学医学院第二附属医院眼科器械清洗机、胰岛素泵、高频手术治疗仪采购项目（0692-2620YD094643）招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-07-27', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24576.html' },
  { id: 71, title: '汕头大学医学院第二附属医院监护仪采购项目（M4400000707539655001）招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 276000, publishDate: '2026-07-27', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24577.html' },
  { id: 72, title: '汕头大学医学院第二附属医院手术综合验光台、短波治疗仪采购项目（M4400000707539590001）招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-07-27', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24578.html' },

  // ===== 2026-07-28 定时检索新增（潮州）=====
  { id: 73, title: '潮州市人民医院妇科LEEP手术系统等设备采购项目(重招)（0724-2630ST822923重1）招标公告（全自动腹膜透析机）', region: '潮州市', category: '其他设备', type: '招标公告', budget: 70000, publishDate: '2026-06-12', sourceUrl: 'https://www.gdmede.com.cn/prArticle?id=2065373999167471618' },
  { id: 74, title: '潮州市人民医院高功率钬激光治疗机项目需求调研公告（GEPT-000094-202607-0013）', region: '潮州市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2026-07-09', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=2075150771480977410' },

  // ===== 2026-07-28 定时检索新增（第二轮）=====
  { id: 75, title: '汕头市中心医院超声内镜系统（4K三维荧光内窥镜摄像系统+彩色多普勒超声诊断系统）采购项目 结果公告', region: '汕头市', category: '内窥镜类', type: '中标结果公告', budget: 2285000, publishDate: '2026-07-15', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/zbgg/202607/t20260715_26936593.htm' },
  { id: 76, title: '汕头市中心医院内窥镜手术器械控制系统两年维护保养服务采购项目(二次) 招标公告', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 2960000, publishDate: '2026-07-06', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260706_26877422.htm' },
  { id: 77, title: '汕头市澄海区中医医院老年病科(医疗设备)改造提升项目（0724-2631ST394464）招标公告（高清电子胃肠镜系统等设备）', region: '汕头市', category: '内窥镜类', type: '招标公告', budget: 1503000, publishDate: '2026-07-16', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260716_26948644.htm' },
  { id: 78, title: '潮州市人民医院妇科LEEP手术系统等设备采购项目(重招)（0724-2630ST822923重2）招标公告（全自动腹膜透析机）', region: '潮州市', category: '其他设备', type: '招标公告', budget: 70000, publishDate: '2026-07-08', sourceUrl: 'https://www.gmgitc.com/BID/BidInfoDetail.aspx?SNID=91699' },
  { id: 79, title: '暨南大学附属第一医院潮汕医院采购医用设备招标项目（0724-2630ST394273）招标公告（全自动结核分枝杆菌核酸及耐药检测系统/显微扫描仪）', region: '潮州市', category: '其他设备', type: '招标公告', budget: 368000, publishDate: '2026-07-09', sourceUrl: 'https://www.gmgitc.com/BID/BidInfoDetail.aspx?SNID=91715' },

  // ===== 2026-07-29 定时检索新增 =====
  { id: 80, title: '汕头大学医学院第二附属医院二氧化碳激光治疗仪、超声透药仪采购项目（CLF0126ST01QY09）公开招标公告', region: '汕头市', category: '其他设备', type: '招标公告', budget: 555000, publishDate: '2026-07-28', sourceUrl: 'https://www.st120.cn/NewsDetail/84/24582.html' },
  { id: 81, title: '潮州市中心医院磁共振成像系统维保服务采购项目需求调研公告（GEPT-000094-202606-0034）', region: '潮州市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2026-07-09', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=2075441421400354817' },
  { id: 82, title: '潮州市中心医院药敏比浊机采购项目调研公告（潮中心采调2026-0705）', region: '潮州市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2026-07-16', sourceUrl: 'https://www.ebidding.com/e-portal/business/detail.html?id=2077551583804207105' },
  { id: 83, title: '汕头大学医学院附属肿瘤医院放射设备维保服务市场调研公告', region: '汕头市', category: '其他设备', type: '调研·论证公告', budget: 0, publishDate: '2026-07-17', sourceUrl: 'https://www.sumcch.cn/newsinfo.asp?cxid=49274&cxsortid=318' },

  // ===== 广东省其他 19 个地级市（2026-07-29 定时检索新增，真实官方来源）=====
  { id: 84, title: '广州市白云区太和人民医院2026年医疗设备采购项目（便携式彩色多普勒超声系统等）招标公告', region: '广州市', category: '彩超·超声设备', type: '招标公告', budget: 5304000, publishDate: '2026-07-08', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260708_26898072.htm' },
  { id: 85, title: '广州市增城区新塘镇中心卫生院2026年医疗设备采购项目（多排螺旋CT/宫腔检查镜/便携式彩超）招标公告', region: '广州市', category: '其他设备', type: '招标公告', budget: 9735000, publishDate: '2026-04-30', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?id=348aeb9f-15a6-48c4-893f-ed2bd2ee625f&type=notice' },
  { id: 86, title: '广州医科大学附属妇女儿童医疗中心智能AI产程监护系统等设备项目(二次) 招标公告', region: '广州市', category: '其他设备', type: '招标公告', budget: 390000, publishDate: '2026-06-11', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?channel=fca71be5-fc0c-45db-96af-f513e9abda9d&channelName=%E9%87%87%E8%B4%AD%E9%A1%B9%E7%9B%AE%E4%BF%A1%E6%81%AF&id=1cb5f314-05f1-4780-9e5f-f4d4abee3b65&openTenderCode=FEZX-2026HW-05&type=notice' },
  { id: 87, title: '深圳市前海蛇口自贸区医院耳鼻喉专用术中电磁导航系统采购(A) 招标公告', region: '深圳市', category: '其他设备', type: '招标公告', budget: 2300000, publishDate: '2026-07-17', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260717_26951908.htm' },
  { id: 88, title: '深圳市宝安区松岗人民医院超声内镜系统采购项目(A) 招标公告', region: '深圳市', category: '内窥镜类', type: '招标公告', budget: 3000000, publishDate: '2026-06-18', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260618_26781211.htm' },
  { id: 89, title: '深圳市第二人民医院大鹏医院数码伍德镜、全自动真菌细菌动态检测仪等设备一批项目(A) 招标公告', region: '深圳市', category: '其他设备', type: '招标公告', budget: 1400500, publishDate: '2026-05-07', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260507_26522844.htm' },
  { id: 90, title: '广东省人民医院珠海医院(珠海市金湾中心医院)口腔颌面锥形束计算机体层摄影系统等医疗设备采购项目 招标公告', region: '珠海市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-06-02', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260602_26670575.htm' },
  { id: 91, title: '广东省人民医院珠海医院(珠海市金湾中心医院)听觉诱发电位仪等医疗设备采购项目 招标公告', region: '珠海市', category: '其他设备', type: '招标公告', budget: 1104000, publishDate: '2026-04-03', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260403_26362615.htm' },
  { id: 92, title: '珠海市第五人民医院移动式三维平板C形臂X射线机系统采购项目 招标公告', region: '珠海市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-03-28', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?id=1033a4ea-907c-4eb9-bb23-493d3539b539' },
  { id: 93, title: '珠海市中西医结合医院体外循环机等医疗设备采购项目 招标公告', region: '珠海市', category: '其他设备', type: '招标公告', budget: 4850000, publishDate: '2026-04-02', sourceUrl: 'https://gbyy.com.cn/zbbgg/zbgg1/content_12181' },
  { id: 94, title: '珠海市中西医结合医院心电监护仪采购项目 公开招标公告', region: '珠海市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-06-24', sourceUrl: 'https://www.gbyy.com.cn/zbbgg/zbgg1/content_12466' },
  { id: 95, title: '佛山市顺德区第五人民医院(龙江医院)2026年度医学装备专项采购(公立医院改革与高质量发展项目) 招标公告', region: '佛山市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-07-16', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260716_26944993.htm' },
  { id: 96, title: '南方医科大学第八附属医院(佛山市顺德区第一人民医院)2026年医疗设备采购项目(第三批医疗设备) 招标公告', region: '佛山市', category: '其他设备', type: '招标公告', budget: 2440000, publishDate: '2026-05-26', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260526_26636025.htm' },
  { id: 97, title: '南方医科大学第八附属医院(佛山市顺德区第一人民医院)2026年医疗设备采购项目(第一批医疗设备) 招标公告', region: '佛山市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-02-28', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202602/t20260228_26204278.htm' },
  { id: 98, title: '广东省人民医院南海医院2026年医用电子生理参数检测仪器设备采购项目 招标公告', region: '佛山市', category: '其他设备', type: '招标公告', budget: 5157000, publishDate: '2026-07-21', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260721_26974946.htm' },
  { id: 99, title: '佛山市禅城区人民医院张槎医院城市健共体眼科、急诊科专科联盟建设配置设备采购项目 招标公告', region: '佛山市', category: '其他设备', type: '招标公告', budget: 2050000, publishDate: '2026-07-17', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260717_26953342.htm' },
  { id: 100, title: '异地新建乐昌市人民医院设备项目采购(检验设备、供应中心设备) 招标公告', region: '韶关市', category: '其他设备', type: '招标公告', budget: 4740000, publishDate: '2026-06-12', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260612_26744514.htm' },
  { id: 101, title: '2025年韶关市卫生健康系统医用设备采购项目(第二批)-术中腹腔镜彩色多普勒超声诊断仪、磁共振成像系统(MRI)、CT 招标公告', region: '韶关市', category: '彩超·超声设备', type: '招标公告', budget: 0, publishDate: '2026-04-30', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260430_26496262.htm' },
  { id: 102, title: '2025年韶关市卫生健康系统医用设备采购项目(第二批)-内窥镜手术控制系统(手术机器人) 招标公告', region: '韶关市', category: '内窥镜类', type: '招标公告', budget: 0, publishDate: '2026-07-15', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260715_26942616.htm' },
  { id: 103, title: '2025年韶关市卫生健康系统医用设备采购项目(第二批)-心肺机 公开招标公告', region: '韶关市', category: '其他设备', type: '招标公告', budget: 2800000, publishDate: '2026-03-09', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202603/t20260309_26251227.htm' },
  { id: 104, title: '广东医科大学附属医院2026年医疗设备采购项目(十一)(二次) 招标公告', region: '湛江市', category: '其他设备', type: '招标公告', budget: 420000, publishDate: '2026-06-24', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260624_26807048.htm' },
  { id: 105, title: '广东医科大学附属第二医院康复设备采购项目 招标公告', region: '湛江市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-05-21', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260521_26608763.htm' },
  { id: 106, title: '湛江中心人民医院医疗设备采购项目(移动式C形臂X射线机) 招标公告', region: '湛江市', category: '其他设备', type: '招标公告', budget: 2100000, publishDate: '2026-04-14', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260414_26404023.htm' },
  { id: 107, title: '湛江中心人民医院医疗设备采购项目(移动式C形臂X射线机) 中标公告', region: '湛江市', category: '其他设备', type: '中标结果公告', budget: 1480000, publishDate: '2026-05-18', sourceUrl: 'https://www.gmgitc.com/BID/BidResultDetail.aspx?ID=0724-2531ZJ696177%7C2026/05/18%7C/01%7C107810' },
  { id: 108, title: '肇庆市第一人民医院(肇庆市医疗紧急救援中心)二氧化碳激光治疗仪等医疗设备采购项目 招标公告', region: '肇庆市', category: '其他设备', type: '招标公告', budget: 1110100, publishDate: '2026-04-30', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260430_26486688.htm' },
  { id: 109, title: '肇庆市第一人民医院(肇庆市医疗紧急救援中心)彩色多普勒超声诊断仪(肝纤维化弹性系统)等医疗设备采购项目 招标公告', region: '肇庆市', category: '彩超·超声设备', type: '招标公告', budget: 0, publishDate: '2026-06-26', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260626_26823947.htm' },
  { id: 110, title: '肇庆高新区中心人民医院项目医疗设备器械(第1批)—DR机及胃肠机 招标公告', region: '肇庆市', category: '其他设备', type: '招标公告', budget: 6865500, publishDate: '2026-06-05', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg//gkzb/202606/t20260605_26698128.htm' },
  { id: 111, title: '肇庆市第一人民医院(肇庆市医疗紧急救援中心)256排及以上CT(双源CT或双探测器CT)采购项目 公开招标通告', region: '肇庆市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-05-14', sourceUrl: 'https://www.zqts.com/info/1491/344571.htm' },
  { id: 112, title: '肇庆市第一人民医院(肇庆市医疗紧急救援中心)经颅磁刺激治疗仪等医疗设备采购项目 公开招标通告', region: '肇庆市', category: '其他设备', type: '招标公告', budget: 977200, publishDate: '2026-07-01', sourceUrl: 'https://www.zqts.com/info/1361/347501.htm' },
  { id: 113, title: '江门市新会区人民医院数字平板血管造影机(DSA)采购项目 招标公告', region: '江门市', category: '其他设备', type: '招标公告', budget: 6400000, publishDate: '2026-07-15', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260715_26941065.htm' },
  { id: 114, title: '江门市中心医院骨科手术显微镜采购项目(二次) 招标公告', region: '江门市', category: '其他设备', type: '招标公告', budget: 1490000, publishDate: '2026-05-26', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260526_26633202.htm' },
  { id: 115, title: '江门市中心医院DSA2套和核磁共振成像系统1套采购项目 招标公告', region: '江门市', category: '其他设备', type: '招标公告', budget: 51000000, publishDate: '2026-04-30', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260430_26496749.htm' },
  { id: 116, title: '江门市中心医院数字影像平台及存储设备项目 招标公告', region: '江门市', category: '其他设备', type: '招标公告', budget: 1980000, publishDate: '2026-06-30', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260630_26844329.htm' },
  { id: 117, title: '江门市中心医院4K腹腔镜摄像系统采购项目 招标公告', region: '江门市', category: '内窥镜类', type: '招标公告', budget: 0, publishDate: '2026-02-13', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202602/t20260213_26179494.htm' },
  { id: 118, title: '茂名市人民医院医疗设备采购项目（单光子发射计算机断层扫描仪/移动式平板三维C形臂）招标公告', region: '茂名市', category: '其他设备', type: '招标公告', budget: 9200000, publishDate: '2026-05-18', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260518_26585371.htm' },
  { id: 119, title: '茂名市人民医院医疗设备采购项目（血液透析机22台/血液透析水处理系统）招标公告', region: '茂名市', category: '其他设备', type: '招标公告', budget: 5068000, publishDate: '2026-04-20', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260420_26431188.htm' },
  { id: 120, title: '茂名市人民医院医疗设备采购项目（神经肌电电刺激/经颅磁刺激/婴儿培养箱等）招标公告', region: '茂名市', category: '其他设备', type: '招标公告', budget: 1505000, publishDate: '2026-05-18', sourceUrl: 'https://ygp.gdzwfw.gov.cn/ggzy-portal/center/apis/dt2c/url-mapping/690141635345956864-3822' },
  { id: 121, title: '茂名市妇幼保健院医疗设备采购项目（医用超声波仪器及设备）采购更正公告', region: '茂名市', category: '彩超·超声设备', type: '招标公告', budget: 2000000, publishDate: '2026-03-10', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?id=3612f7eb-3e8b-41a9-bae6-f5e277620b08' },
  { id: 122, title: '惠州市中心人民医院采购螺旋CT等医疗设备(三次) 招标公告', region: '惠州市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-06-02', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260602_26672835.htm' },
  { id: 123, title: '博罗县妇幼保健院异地升级改造工程(二期)第七批医疗设备采购项目（内窥镜摄像系统/便携式彩超）招标公告', region: '惠州市', category: '其他设备', type: '招标公告', budget: 4845000, publishDate: '2026-07-17', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg//gkzb/202607/t20260717_26959043.htm' },
  { id: 124, title: '广东省惠州市第一妇幼保健院2026年第五批医疗设备采购项目（全自动化学发光免疫分析仪等）招标公告', region: '惠州市', category: '其他设备', type: '招标公告', budget: 531000, publishDate: '2026-07-17', sourceUrl: 'https://www.cfen.com.cn/zcgg/202607/t20260717_909963.html' },
  { id: 125, title: '惠州市第三人民医院电子胆道镜手术系统采购项目(第三次) 招标公告', region: '惠州市', category: '内窥镜类', type: '招标公告', budget: 0, publishDate: '2026-03-13', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202603/t20260313_26270038.htm' },
  { id: 126, title: '惠州市第一妇幼保健院2026年第二批医疗设备采购项目 招标公告', region: '惠州市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-05-14', sourceUrl: 'https://www.hz3861.gd.cn/?news/7466.jsp' },
  { id: 127, title: '梅州市人民医院彩色多普勒超声诊断仪一批设备采购项目 招标公告', region: '梅州市', category: '彩超·超声设备', type: '招标公告', budget: 12600000, publishDate: '2026-04-30', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260430_26488365.htm' },
  { id: 128, title: '平远县妇幼保健院2025年度医疗设备采购项目（皮秒激光/强脉冲光/二氧化碳激光）招标公告', region: '梅州市', category: '其他设备', type: '招标公告', budget: 4511324, publishDate: '2026-01-26', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202601/t20260126_26118369.htm' },
  { id: 129, title: '中山大学附属第三医院粤东医院直线加速器采购项目 公开招标公告', region: '梅州市', category: '其他设备', type: '招标公告', budget: 22000000, publishDate: '2026-06-26', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260626_26825064.htm' },
  { id: 130, title: '蕉岭县人民医院1.5T磁共振设备租赁项目 招标公告', region: '梅州市', category: '其他设备', type: '招标公告', budget: 3960000, publishDate: '2026-07-20', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260720_26964727.htm' },
  { id: 131, title: '广东汕尾红海湾经济开发区人民医院医疗设备采购项目（血透滤过机/电子胃镜/电子肠镜）招标公告', region: '汕尾市', category: '其他设备', type: '招标公告', budget: 1210000, publishDate: '2026-06-18', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260618_26780426.htm' },
  { id: 132, title: '深汕中医医院(汕尾市中医医院)建设项目一期第四批医疗设备采购项目(六)（彩色多普勒超声诊断系统）招标公告', region: '汕尾市', category: '彩超·超声设备', type: '招标公告', budget: 3277600, publishDate: '2026-07-14', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260714_26933408.htm' },
  { id: 133, title: '2026年陆河县医疗设备更新与血液透析能力提升项目医疗设备采购项目 招标公告', region: '汕尾市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-06-10', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg//gkzb/202606/t20260610_26726274.htm' },
  { id: 134, title: '深汕中医医院(汕尾市中医医院)建设项目一期第四批医疗设备采购项目(三) 招标公告', region: '汕尾市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-05-20', sourceUrl: 'https://guangdong.jianyu360.cn/jybx/20260520_26051955218613.html' },
  { id: 135, title: '深汕中医医院(汕尾市中医医院)建设项目一期第三批医疗设备采购项目(十三)（产科中央监护系统/神经肌肉治疗仪）招标公告', region: '汕尾市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-04-27', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260427_26466050.htm' },
  { id: 136, title: '河源市人民医院三维电生理导航系统等医疗设备采购项目（钬激光/输尿管镜）招标公告', region: '河源市', category: '其他设备', type: '招标公告', budget: 12538297, publishDate: '2026-05-15', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260515_26575344.htm' },
  { id: 137, title: '河源市人民医院128排及以上螺旋CT等医疗设备采购项目（高档彩超机）招标公告', region: '河源市', category: '其他设备', type: '招标公告', budget: 15985000, publishDate: '2026-01-21', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202512/t20251231_26020319.htm' },
  { id: 138, title: '河源市人民医院心电监护仪等一批医疗设备采购项目 竞争性磋商公告', region: '河源市', category: '其他设备', type: '招标公告', budget: 463000, publishDate: '2026-07-14', sourceUrl: 'https://www.hyrmyy.com/mview.aspx?id=15844' },
  { id: 139, title: '龙川县人民医院腔镜内镜模拟教学系统设备采购项目 招标公告', region: '河源市', category: '内窥镜类', type: '招标公告', budget: 1730000, publishDate: '2026-03-16', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202603/t20260316_26276108.htm' },
  { id: 140, title: '河源市中医院医用气体系统配套设备采购项目(三次) 竞争性谈判公告', region: '河源市', category: '其他设备', type: '招标公告', budget: 1247714, publishDate: '2026-02-26', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/jzxtpgg/202602/t20260226_26196995.htm' },
  { id: 141, title: '阳江市人民医院医疗设备采购项目(25-14)(二次)（全自动间接免疫荧光/酶联免疫一体机）招标公告', region: '阳江市', category: '其他设备', type: '招标公告', budget: 1200000, publishDate: '2026-03-25', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202603/t20260325_26314792.htm' },
  { id: 142, title: '阳江市中医医院检验科流水线采购项目 招标公告', region: '阳江市', category: '其他设备', type: '招标公告', budget: 2098000, publishDate: '2026-07-20', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260720_26966285.htm' },
  { id: 143, title: '阳江市人民医院医疗设备采购项目(26-2)（彩色多普勒超声诊断系统）招标公告', region: '阳江市', category: '彩超·超声设备', type: '招标公告', budget: 2500000, publishDate: '2026-04-08', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?id=ca9992be-0b6d-456c-a0f4-ad0b971c60cf&type=notice' },
  { id: 144, title: '阳江市人民医院数字减影血管成像系统(DSA)采购项目 招标公告', region: '阳江市', category: '其他设备', type: '招标公告', budget: 12000000, publishDate: '2026-01-22', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202601/t20260122_26105548.htm' },
  { id: 145, title: '清远市清新区人民医院医疗设备采购项目（口腔手术显微镜/牙科综合治疗机）(二次) 招标公告', region: '清远市', category: '其他设备', type: '招标公告', budget: 450000, publishDate: '2026-01-16', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202601/t20260116_26082114.htm' },
  { id: 146, title: '美林湖医院改扩建项目医疗设备(医用血管造影X射线机)采购 招标公告', region: '清远市', category: '其他设备', type: '招标公告', budget: 5500000, publishDate: '2026-07-17', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202607/t20260717_26958109.htm' },
  { id: 147, title: '广州医科大学附属清远医院(清远市人民医院)2026年负压救护车及随车设备采购项目 公开招标公告', region: '清远市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-06-05', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260605_26696819.htm' },
  { id: 148, title: '连州市人民医院超高档实时四维彩色多普勒超声诊断仪采购项目 招标公告', region: '清远市', category: '彩超·超声设备', type: '招标公告', budget: 0, publishDate: '2026-01-14', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202601/t20260114_26075341.htm' },
  { id: 149, title: '东莞市樟木头医院2026年医疗设备采购项目（支气管镜/宫腔镜/3D打印系统）招标公告', region: '东莞市', category: '内窥镜类', type: '招标公告', budget: 7780000, publishDate: '2026-05-29', sourceUrl: 'https://www.dg.gov.cn/dgzmtz/gkmlpt/content/4/4543/mpost_4543778.html' },
  { id: 150, title: '东莞市虎门医院医疗设备购置项目(2026年第四批)（视频插管软镜/强脉冲光与激光系统）招标公告', region: '东莞市', category: '内窥镜类', type: '招标公告', budget: 4099000, publishDate: '2026-05-20', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260520_26598611.htm' },
  { id: 151, title: '东莞市长安医院购置医用台式全自动测血压仪等一批单价50万元以下医疗设备项目 招标公告', region: '东莞市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-06-05', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260605_26690920.htm' },
  { id: 152, title: '东莞市莞城医院医用分子筛中心制氧系统服务项目 招标公告', region: '东莞市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-06-09', sourceUrl: 'https://www.dg.gov.cn/zwgk/zfxxgkml/zcjd/ywgz/zbcg/content/post_4549008.html' },
  { id: 153, title: '东莞市人民医院水处理系统及手术床等一批医疗设备采购项目(二次) 招标公告', region: '东莞市', category: '其他设备', type: '招标公告', budget: 387000, publishDate: '2026-03-04', sourceUrl: 'https://gdgpo.czt.gd.gov.cn/maincms-web/noticeGd?id=025af2ac-efae-41f2-831d-70877b5926b7' },
  { id: 154, title: '中山市南部区域中心医院改造提升工程项目设施设备采购(二十二)（全数字化动态X线摄影系统/移动DR）招标公告', region: '中山市', category: '其他设备', type: '招标公告', budget: 2528000, publishDate: '2026-05-11', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260511_26546707.htm' },
  { id: 155, title: '中山市南部区域中心医院改造提升工程项目设施设备采购(三十七)（4K医用内窥镜摄像系统）招标公告', region: '中山市', category: '内窥镜类', type: '招标公告', budget: 2640000, publishDate: '2026-06-17', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260617_26769451.htm' },
  { id: 156, title: '中山市南部区域中心医院改造提升工程项目设施设备采购(二十六)（血液透析机/气囊式体外反搏）招标公告', region: '中山市', category: '其他设备', type: '招标公告', budget: 3385000, publishDate: '2026-05-08', sourceUrl: 'https://www.zsjypt.cn/artical/53/248472' },
  { id: 157, title: '中山市中医院麻醉机采购项目 公开招标公告', region: '中山市', category: '其他设备', type: '招标公告', budget: 1250000, publishDate: '2026-03-19', sourceUrl: 'https://www.zsjypt.cn/artical/60/247554' },
  { id: 158, title: '揭阳市榕城区中心医院医疗设备采购项目（全自动血常规流水线/生化免疫检测流水线）招标公告', region: '揭阳市', category: '其他设备', type: '招标公告', budget: 2447000, publishDate: '2026-02-03', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202602/t20260203_26143563.htm' },
  { id: 159, title: '揭阳市榕城区中心医院采购医疗设备招标项目(0724-2631ST820175) 招标公告', region: '揭阳市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-01-14', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202601/t20260114_26076911.htm' },
  { id: 160, title: '揭西县人民医院医疗设备采购项目 招标公告', region: '揭阳市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-03-09', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202603/t20260309_26248280.htm' },
  { id: 161, title: '揭阳市揭东区人民医院胸痛中心建设项目 招标公告', region: '揭阳市', category: '其他设备', type: '招标公告', budget: 2850000, publishDate: '2026-06-23', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202606/t20260623_26797029.htm' },
  { id: 162, title: '揭阳市人民医院麻醉机等医疗设备一批采购项目 招标公告', region: '揭阳市', category: '其他设备', type: '招标公告', budget: 4091600, publishDate: '2026-01-13', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202512/t20251223_25976764.htm' },
  { id: 163, title: '云浮市人民医院体外心肺支持辅助设备(ECMO)、血气分析仪采购项目 招标公告', region: '云浮市', category: '其他设备', type: '招标公告', budget: 1015000, publishDate: '2026-04-29', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202604/t20260429_26481767.htm' },
  { id: 164, title: '罗定市人民医院医疗设备采购项目 招标公告', region: '云浮市', category: '其他设备', type: '招标公告', budget: 0, publishDate: '2026-05-20', sourceUrl: 'https://www.ccgp.gov.cn/cggg/dfgg/gkzb/202605/t20260520_26595827.htm' },
  { id: 165, title: '郁南县妇幼保健院购置全自动血液分析仪比选采购公告', region: '云浮市', category: '其他设备', type: '招标公告', budget: 167355, publishDate: '2026-03-12', sourceUrl: 'https://www.gdyunan.gov.cn/gkmlpt/content/1/1995/post_1995539.html' },
  { id: 166, title: '郁南县人民医院全自动医用PCR分析系统项目 招标公告', region: '云浮市', category: '其他设备', type: '招标公告', budget: 128000, publishDate: '2026-06-10', sourceUrl: 'http://yfstpzb.com/html/dailijizhang/230.html' }
];
