import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RotateCcw, ChevronRight } from "lucide-react";

import step1Jeogori from "./assets/hanbok/step1-jeogori.png";
import step1Skirt from "./assets/hanbok/step1-skirt.png";

import step2ToneJeogoriPastel from "./assets/hanbok/step2-tone-jeogori-pastel.png";
import step2ToneJeogoriMute from "./assets/hanbok/step2-tone-jeogori-mute.png";
import step2ToneJeogoriPrimary from "./assets/hanbok/step2-tone-jeogori-primary.png";
import step2ToneSkirtPastel from "./assets/hanbok/step2-tone-skirt-pastel.png";
import step2ToneSkirtMute from "./assets/hanbok/step2-tone-skirt-mute.png";
import step2ToneSkirtPrimary from "./assets/hanbok/step2-tone-skirt-primary.png";

import step3FabricJeogoriGlossy from "./assets/hanbok/step3-fabric-jeogori-glossy.png";
import step3FabricJeogoriMatte from "./assets/hanbok/step3-fabric-jeogori-matte.png";
import step3FabricSkirtGlossy from "./assets/hanbok/step3-fabric-skirt-glossy.png";
import step3FabricSkirtMatte from "./assets/hanbok/step3-fabric-skirt-matte.png";

import step4JeogoriBasicJeogori from "./assets/hanbok/step4-jeogori-basic-jeogori.png";
import step4JeogoriBasicSkirt from "./assets/hanbok/step4-jeogori-basic-skirt.png";
import step4JeogoriDanguiJeogori from "./assets/hanbok/step4-jeogori-dangui-jeogori.png";
import step4JeogoriDanguiSkirt from "./assets/hanbok/step4-jeogori-dangui-skirt.png";

import step5SkirtSplit from "./assets/hanbok/step5-skirt-split.png";
import step5SkirtTube from "./assets/hanbok/step5-skirt-tube.png";
import step5SkirtSeeThrough from "./assets/hanbok/step5-skirt-seeThrough.png";

const steps = [
  {
    key: "accentPlacement",
    title: "배색 포인트를 골라주세요",
    subtitle: "저고리와 치마 중 어떤 쪽이 더 중요한지 선택해요.",
    options: [
      {
        value: "jeogori",
        label: "저고리 배색 포인트",
        description: "시선이 상체로 모이고 단정한 인상이 강조돼요.",
        image: step1Jeogori,
      },
      {
        value: "skirt",
        label: "치마 배색 포인트",
        description: "하체 쪽 존재감이 살아나고 우아한 분위기가 커져요.",
        image: step1Skirt,
      },
    ],
  },
  {
    key: "tone",
    title: "원하는 색감을 골라주세요",
    subtitle: "세 가지 색감 이미지를 보여드릴게요.",
    options: [
      {
        value: "pastel",
        label: "파스텔톤",
        description: "부드럽고 화사한 느낌",
        imageByPlacement: {
          jeogori: step2ToneJeogoriPastel,
          skirt: step2ToneSkirtPastel,
        },
      },
      {
        value: "mute",
        label: "뮤트톤",
        description: "차분하고 고급스러운 느낌",
        imageByPlacement: {
          jeogori: step2ToneJeogoriMute,
          skirt: step2ToneSkirtMute,
        },
      },
      {
        value: "primary",
        label: "원색톤",
        description: "선명하고 존재감 있는 느낌",
        imageByPlacement: {
          jeogori: step2ToneJeogoriPrimary,
          skirt: step2ToneSkirtPrimary,
        },
      },
    ],
  },
  {
    key: "fabric",
    title: "원단 질감을 골라주세요",
    subtitle: "유광/무광 이미지를 보여드릴게요.",
    options: [
      {
        value: "glossy",
        label: "유광",
        description: "화사하고 격식 있는 무드",
        imageByPlacement: {
          jeogori: step3FabricJeogoriGlossy,
          skirt: step3FabricSkirtGlossy,
        },
      },
      {
        value: "matte",
        label: "무광",
        description: "담백하고 세련된 무드",
        imageByPlacement: {
          jeogori: step3FabricJeogoriMatte,
          skirt: step3FabricSkirtMatte,
        },
      },
    ],
  },
  {
    key: "jeogoriType",
    title: "저고리 형태를 골라주세요",
    subtitle: "두 종류의 저고리를 보여드릴게요.",
    options: [
      {
        value: "basic",
        label: "일반 저고리",
        description: "가장 익숙하고 단정한 기본형",
        imageByPlacement: {
          jeogori: step4JeogoriBasicJeogori,
          skirt: step4JeogoriBasicSkirt,
        },
      },
      {
        value: "dangui",
        label: "당의 저고리",
        description: "격식 있고 화려한 인상",
        imageByPlacement: {
          jeogori: step4JeogoriDanguiJeogori,
          skirt: step4JeogoriDanguiSkirt,
        },
      },
    ],
  },
  {
    key: "skirtType",
    title: "치마 형태를 골라주세요",
    subtitle: "치마 형태에 따라 볼륨감이 달라져요.",
    options: [
      {
        value: "split",
        label: "갈래치마",
        description: "움직임이 자연스럽고 전통적인 느낌",
        image: step5SkirtSplit,
      },
      {
        value: "tube",
        label: "통치마",
        description: "깔끔하고 안정감 있는 실루엣",
        image: step5SkirtTube,
      },
      {
        value: "seeThrough",
        label: "시스루 치마",
        description: "가볍고 여성스러운 포인트",
        image: step5SkirtSeeThrough,
      },
    ],
  },
];

const labelMap = {
  accentPlacement: {
    jeogori: "저고리 배색 포인트",
    skirt: "치마 배색 포인트",
  },
  tone: {
    pastel: "파스텔톤",
    mute: "뮤트톤",
    primary: "원색톤",
  },
  fabric: {
    glossy: "유광",
    matte: "무광",
  },
  jeogoriType: {
    basic: "일반 저고리",
    dangui: "당의 저고리",
  },
  skirtType: {
    split: "갈래치마",
    tube: "통치마",
    seeThrough: "시스루 치마",
  },
};

function findBestResult(answers) {
  return {
    name: [
      labelMap.accentPlacement?.[answers.accentPlacement],
      labelMap.tone?.[answers.tone],
      labelMap.fabric?.[answers.fabric],
      labelMap.jeogoriType?.[answers.jeogoriType],
      labelMap.skirtType?.[answers.skirtType],
    ]
      .filter(Boolean)
      .join(" · "),
    summary:
      "선택한 조건을 바탕으로 한복 취향을 정리해보았습니다. 4월 16일에 함께 보시면서 결정해주시면 감사하겠습니다~!",
  };
}

function ProgressBar({ value }) {
  return (
    <div style={{ width: "100%", height: 8, background: "#f3f4f6", borderRadius: 9999, overflow: "hidden" }}>
      <div
        style={{
          width: `${value}%`,
          height: "100%",
          background: "linear-gradient(90deg, #fb7185, #fdba74)",
          borderRadius: 9999,
          transition: "width 0.25s ease",
        }}
      />
    </div>
  );
}

function SelectionCard({ option, onSelect }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      style={{
        width: "100%",
        textAlign: "left",
        border: "none",
        background: "transparent",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: 24,
          background: "#fff",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div style={{ aspectRatio: "4 / 5", width: "100%", overflow: "hidden", background: "#f1f5f9" }}>
          <img
            src={option.displayImage || option.image}
            alt={option.label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{option.label}</h3>
              <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.5, color: "#64748b" }}>{option.description}</p>
            </div>
            <ChevronRight size={20} color="#94a3b8" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function HanbokTournamentApp() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const resultRef = useRef(null);

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isCompleted = currentStep >= totalSteps;
  const result = useMemo(() => findBestResult(answers), [answers]);

  const currentStepData = steps[currentStep];

  const currentOptions = useMemo(() => {
    if (!currentStepData) return [];

    if (
      currentStepData.key === "tone" ||
      currentStepData.key === "fabric" ||
      currentStepData.key === "jeogoriType"
    ) {
      const placement = answers.accentPlacement;
      return currentStepData.options.map((option) => ({
        ...option,
        displayImage: option.imageByPlacement?.[placement] || option.image,
      }));
    }

    return currentStepData.options;
  }, [currentStepData, answers.accentPlacement]);

  const handleSelect = (value) => {
    const step = steps[currentStep];
    const nextAnswers = { ...answers, [step.key]: value };
    setAnswers(nextAnswers);
    setCurrentStep((prev) => prev + 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#fffaf8",
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.download = "hanbok-result.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error(error);
      alert("이미지 저장에 실패했어요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #fff1f2, #ffffff, #fff7ed)",
        padding: "24px 16px",
        color: "#0f172a",
      }}
    >
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#f43f5e" }}>어머님 한복 취향 찾기</p>
          <h1 style={{ margin: "8px 0 0", fontSize: 30, lineHeight: 1.25, fontWeight: 800 }}>
            어머님♥ 
            <br />
            어떤 스타일 좋아하세요?
            <br />
            편안하게 골라보세요~!
          </h1>
          <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.7, color: "#64748b" }}>
            5개의 취향을 고르시고 결과 카드를 저장해
            <br />
            저희(수미&영환)에게 알려주세요~!
          </p>
        </motion.div>

        {!isCompleted && (
          <div
            style={{
              marginBottom: 24,
              borderRadius: 24,
              background: "rgba(255,255,255,0.85)",
              padding: 16,
              boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 14 }}>
              <span style={{ fontWeight: 600, color: "#475569" }}>
                {currentStep + 1} / {totalSteps} 단계
              </span>
              <span style={{ color: "#94a3b8" }}>{Math.round(progress)}%</span>
            </div>
            <ProgressBar value={progress} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentStepData.key}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{currentStepData.title}</h2>
                <p style={{ margin: "6px 0 0", fontSize: 14, color: "#64748b" }}>{currentStepData.subtitle}</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {currentOptions.map((option) => (
                  <SelectionCard key={option.value} option={option} onSelect={() => handleSelect(option.value)} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div
                ref={resultRef}
                style={{
                  overflow: "hidden",
                  borderRadius: 32,
                  background: "#fffaf8",
                  boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
                }}
              >
                <div
                  style={{
                    borderBottom: "1px solid #ffe4e6",
                    background: "linear-gradient(to right, #fff1f2, #fff7ed)",
                    padding: 24,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#f43f5e" }}>추천 결과</p>
                  <h2 style={{ margin: "8px 0 0", fontSize: 28, lineHeight: 1.3, fontWeight: 800 }}>{result?.name}</h2>
                  <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.7, color: "#475569" }}>{result?.summary}</p>
                </div>

                <div style={{ padding: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {Object.entries(answers).map(([key, value]) => (
                      <div
                        key={key}
                        style={{
                          borderRadius: 18,
                          background: "#fff",
                          padding: "12px 14px",
                          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.05)",
                        }}
                      >
                        <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
                          {steps.find((step) => step.key === key)?.title.replace("를 골라주세요", "")}
                        </p>
                        <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 700, color: "#1e293b" }}>
                          {labelMap[key][value]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button
                  onClick={handleRestart}
                  style={{
                    height: 48,
                    borderRadius: 18,
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <RotateCcw size={16} />
                  다시 선택하기
                </button>
                <button
                  onClick={handleSaveImage}
                  disabled={isSaving}
                  style={{
                    height: 48,
                    borderRadius: 18,
                    border: "none",
                    background: "#111827",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    opacity: isSaving ? 0.7 : 1,
                  }}
                >
                  <Download size={16} />
                  {isSaving ? "저장 중..." : "결과 이미지 저장"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}