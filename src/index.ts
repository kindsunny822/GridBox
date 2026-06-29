import {
  AuthorizationType,
  FieldExecuteCode,
  FieldType,
  FormItemComponent,
  fieldDecoratorKit
} from "dingtalk-docs-cool-app/dist-node/module";

const GRIDBOX_DOMAIN = "api.gridbox.example.com";
const GRIDBOX_BASE_URL = `https://${GRIDBOX_DOMAIN}`;
const AUTH_ID = "gridbox_api_key";

const { t } = fieldDecoratorKit;

fieldDecoratorKit.setDomainList([GRIDBOX_DOMAIN]);

function buildPrompt({
  productName,
  sellingPoint,
  imageType,
  style,
  customPrompt
}: {
  productName: string;
  sellingPoint?: string;
  imageType: string;
  style: string;
  customPrompt?: string;
}) {
  return [
    `为电商商品“${productName}”生成${imageType}。`,
    sellingPoint ? `突出卖点：${sellingPoint}。` : "",
    style ? `视觉风格：${style}。` : "",
    customPrompt ? `补充要求：${customPrompt}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

fieldDecoratorKit.setDecorator({
  id: "gridbox_ecommerce_image",
  name: t("name"),
  i18nMap: {
    "zh-CN": {
      name: "电商AI生图",
      authLabel: "GridBox API Key",
      authTip: "请在 GridBox 控制台复制 API Key",
      productName: "商品名称字段",
      sellingPoint: "核心卖点字段",
      imageType: "图片类型",
      style: "图片风格",
      resolution: "分辨率",
      customPrompt: "补充描述",
      customPromptPlaceholder: "可补充场景、构图、背景、光线、禁用元素等",
      mainImage: "电商主图",
      sceneImage: "场景图",
      adImage: "直通车图",
      detailImage: "详情图",
      cleanStyle: "白底简约",
      premiumStyle: "高级质感",
      lifestyleStyle: "生活场景",
      promoStyle: "促销氛围"
    },
    "en-US": {
      name: "Ecommerce AI Image",
      authLabel: "GridBox API Key",
      authTip: "Copy your API Key from GridBox Console",
      productName: "Product field",
      sellingPoint: "Selling point field",
      imageType: "Image type",
      style: "Visual style",
      resolution: "Resolution",
      customPrompt: "Extra prompt",
      customPromptPlaceholder: "Scene, composition, background, lighting, negative elements",
      mainImage: "Main image",
      sceneImage: "Scene image",
      adImage: "Ad image",
      detailImage: "Detail image",
      cleanStyle: "Clean white",
      premiumStyle: "Premium",
      lifestyleStyle: "Lifestyle",
      promoStyle: "Promotion"
    },
    "ja-JP": {
      name: "EC AI画像",
      authLabel: "GridBox API Key",
      authTip: "GridBox Console から API Key をコピーしてください",
      productName: "商品名フィールド",
      sellingPoint: "セールスポイントフィールド",
      imageType: "画像タイプ",
      style: "画像スタイル",
      resolution: "解像度",
      customPrompt: "追加説明",
      customPromptPlaceholder: "シーン、構図、背景、照明、除外要素など",
      mainImage: "メイン画像",
      sceneImage: "シーン画像",
      adImage: "広告画像",
      detailImage: "詳細画像",
      cleanStyle: "白背景シンプル",
      premiumStyle: "高級感",
      lifestyleStyle: "ライフスタイル",
      promoStyle: "プロモーション"
    }
  },
  authorizations: [
    {
      id: AUTH_ID,
      platform: "GridBox",
      type: AuthorizationType.HeaderBearerToken,
      required: true,
      instructionsUrl: "https://gridbox.example.com/console",
      label: t("authLabel"),
      tooltips: t("authTip"),
      icon: {
        light: "",
        dark: ""
      }
    }
  ],
  formItems: [
    {
      key: "productName",
      label: t("productName"),
      component: FormItemComponent.FieldSelect,
      props: {
        mode: "single",
        supportTypes: [FieldType.Text]
      },
      validator: {
        required: true
      }
    },
    {
      key: "sellingPoint",
      label: t("sellingPoint"),
      component: FormItemComponent.FieldSelect,
      props: {
        mode: "single",
        supportTypes: [FieldType.Text]
      },
      validator: {
        required: false
      }
    },
    {
      key: "imageType",
      label: t("imageType"),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: "main",
        placeholder: t("imageType"),
        options: [
          { key: "main", title: t("mainImage") },
          { key: "scene", title: t("sceneImage") },
          { key: "ad", title: t("adImage") },
          { key: "detail", title: t("detailImage") }
        ]
      },
      validator: {
        required: true
      }
    },
    {
      key: "style",
      label: t("style"),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: "clean",
        placeholder: t("style"),
        options: [
          { key: "clean", title: t("cleanStyle") },
          { key: "premium", title: t("premiumStyle") },
          { key: "lifestyle", title: t("lifestyleStyle") },
          { key: "promo", title: t("promoStyle") }
        ]
      },
      validator: {
        required: true
      }
    },
    {
      key: "resolution",
      label: t("resolution"),
      component: FormItemComponent.SingleSelect,
      props: {
        defaultValue: "1K",
        placeholder: t("resolution"),
        options: [
          { key: "1K", title: "1K" },
          { key: "2K", title: "2K" },
          { key: "4K", title: "4K" }
        ]
      },
      validator: {
        required: true
      }
    },
    {
      key: "customPrompt",
      label: t("customPrompt"),
      component: FormItemComponent.Textarea,
      props: {
        placeholder: t("customPromptPlaceholder"),
        enableFieldReference: true
      },
      validator: {
        required: false
      }
    }
  ],
  resultType: {
    type: FieldType.Attachment
  },
  execute: async (context, formData) => {
    const productName = formData.productName || "测试商品";
    const sellingPoint = formData.sellingPoint || "";
    const imageType = formData.imageType || "main";
    const style = formData.style || "clean";
    const resolution = formData.resolution || "1K";
    const customPrompt = formData.customPrompt || "";

    const response = await context.fetch(
      `${GRIDBOX_BASE_URL}/api/v1/faas/ecommerce-image-sync`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          resolution,
          outputFormat: "PNG",
          record: {
            productName,
            sellingPoint,
            imageType,
            style
          },
          prompt: buildPrompt({
            productName,
            sellingPoint,
            imageType,
            style,
            customPrompt
          })
        })
      },
      AUTH_ID
    );

    const data = await response.json();
    if (!response.ok || !data.ok) {
      return {
        code: response.status === 402 ? FieldExecuteCode.QuotaExhausted : FieldExecuteCode.Error,
        errorMessage: "生成失败"
      };
    }

    const imageUrl = data.imageUrl?.startsWith("http")
      ? data.imageUrl
      : `${GRIDBOX_BASE_URL}${data.imageUrl}`;

    return {
      code: FieldExecuteCode.Success,
      data: [
        {
          fileName: `${String(productName).slice(0, 30) || "电商AI生图"}.png`,
          type: "image/png",
          url: imageUrl
        }
      ]
    };
  }
});

export default fieldDecoratorKit;
