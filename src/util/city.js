/*
* @Author: midoDaddy
* @Date:   2017-11-01 15:45:10
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-11-01 15:59:16
*/
var _city = {

    data: {
        "北京": ["西城", "东城", "崇文", "宣武", "朝阳", "海淀", "丰台", "石景山", "门头沟", "房山", "通州", "顺义", "大兴", "昌平", "平谷", "怀柔", "密云", "延庆"],
        "天津": ["青羊", "河东", "河西", "南开", "河北", "红桥", "塘沽", "汉沽", "大港", "东丽", "西青", "北辰", "津南", "武清", "宝坻", "静海", "宁河", "蓟县", "开发区"],
        "河北": ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"],
        "山西": ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"],
        "内蒙古": ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"],
        "辽宁": ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"],
        "吉林": ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"],
        "黑龙江": ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"],
        "上海": ["浦东", "杨浦", "徐汇", "静安", "卢湾", "黄浦", "普陀", "闸北", "虹口", "长宁", "宝山", "闵行", "嘉定", "金山", "松江", "青浦", "崇明", "奉贤", "南汇"],
        "江苏": ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"],
        "浙江": ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"],
        "安徽": ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"],
        "福建": ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"],
        "江西": ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"],
        "山东": ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"],
        "河南": ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"],
        "湖北": ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"],
        "湖南": ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"],
        "广东": ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"],
        "广西": ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"],
        "海南": ["海口", "三亚"],
        "重庆": ["渝中", "大渡口", "江北", "沙坪坝", "九龙坡", "南岸", "北碚", "万盛", "双桥", "渝北", "巴南", "万州", "涪陵", "黔江", "长寿"],
        "四川": ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"],
        "贵州": ["贵阳", "遵义", "安顺", "黔西南", "都匀"],
        "云南": ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"],
        "西藏": ["拉萨", "林芝", "日喀则", "昌都"],
        "陕西": ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"],
        "甘肃": ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"],
        "青海": ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"],
        "宁夏": ["银川", "吴忠"],
        "新疆": ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"],
        "香港": ["中西区", "湾仔区", "东区", "南区", "九龙-油尖旺区", "九龙-深水埗区", "九龙-九龙城区", "九龙-黄大仙区", "九龙-观塘区", "新界-北区", "新界-大埔区", "新界-沙田区", "新界-西贡区", "新界-荃湾区", "新界-屯门区", "新界-元朗区", "新界-葵青区", "新界-离岛区"],
        "澳门": ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路氹城"]
    },

    //获取省份数据
    getProvinces: function() {
        var data = [];
        for (var item in this.data) {
            data.push(item);
        }
        return data;
    },

    //获取城市数据
    getCities: function(province) {
        return this.data[province];
    }
};

module.exports = _city;