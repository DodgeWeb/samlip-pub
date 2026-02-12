import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

type BrandItem = {
  id: number;
  name: string;
  imageUrl: string;
  // 브랜드 상세(라우터)로 이동하기 위한 경로
  path?: string;
  isHighlighted?: boolean;
};

export type BakerySectionData = {
  id: number;
  title: string;
  newSectionTitle: string;
  subtitle: string;
  backgroundImage: string;
  backgroundImageNew?: string;
  brands: readonly BrandItem[];
};

export type BakerySplitSnapSectionHandle = {
  // 순행(아래로 스크롤) 입력을 "섹션 내부 스텝"으로 소비할 수 있으면 true
  tryForwardStep: () => boolean;
  // 역행(위로 스크롤) 입력을 "섹션 내부 스텝"으로 되돌릴 수 있으면 true
  tryReverseStep: () => boolean;
};

type Props = {
  data: BakerySectionData;
  prefersReducedMotion: boolean;
  // 상위에서 스냅 섹션 위치 계산을 위해 section element를 받아갈 수 있도록 콜백 제공
  setSectionEl: (el: HTMLElement | null) => void;
  // 두 번째 섹션 등 좌/우 반전이 필요할 때 사용
  reverse?: boolean;
};

// 이 섹션은 "스크롤 스냅 1덩이" 단위
// - 기본: 우측(이미지) 풀스크린
// - 순행 1번: 좌측 패널 50%로 확장 + 텍스트 80% 지점까지 페이드아웃 + 좌측 컨텐츠는 60% 지점부터 등장
// - 확장 완료 후: big 이미지 페이드인 → 이후 3초 자동 롤링 시작 → 활성 브랜드에 따라 big 이미지가 "다음만 페이드인"으로 교체
export const BakerySplitSnapSection = forwardRef<BakerySplitSnapSectionHandle, Props>(
  ({ data, prefersReducedMotion, setSectionEl, reverse = false }, ref) => {
    const router = useRouter();
    const [splitStep, setSplitStep] = useState<0 | 1>(0);
    const splitStepRef = useRef<0 | 1>(0);
    const splitDoneRef = useRef(false);
    const [isSplitExpandedDone, setIsSplitExpandedDone] = useState(false);

    // 브랜드 자동 롤링(3초) + 호버 우선 활성
    const brands = useMemo(() => Array.from(data.brands), [data.brands]);
    const [activeBrandIndex, setActiveBrandIndex] = useState(0);
    const [hoveredBrandIndex, setHoveredBrandIndex] = useState<number | null>(null);
    const [isRollingEnabled, setIsRollingEnabled] = useState(false);
    const rollingEnabledRef = useRef(false);

    // 우측 big 이미지 크로스페이드(현재 유지 + 다음만 페이드인)
    const [activeBigSrc, setActiveBigSrc] = useState<string>('');
    const [transitionBigSrc, setTransitionBigSrc] = useState<string | null>(null);
    const isBigTransitioningRef = useRef(false);

    // 브랜드 카드(좌측) hover/활성에 따라 우측 big 이미지를 교체해야 함
    // - heritage: /img/brand/bakery/heritage_01_act.png -> /img/brand/bakery/heritage_big_01.png
    // - healthy:  /img/brand/bakery/healthy_01.png     -> /img/brand/bakery/healthy_big_01.png
    // - home/premium: 단일 브랜드이므로 섹션 고정 big 이미지 사용
    const getBigSrc = (index: number) => {
      const url = brands[index]?.imageUrl ?? '';
      const m = url.match(/\/img\/brand\/(?:bakery\/)?([a-zA-Z_-]+)_(\d+)(?:_act)?\.png$/);
      if (m) {
        const prefix = m[1];
        const num = String(parseInt(m[2] ?? '1', 10)).padStart(2, '0');
        return `/img/brand/bakery/${prefix}_big_${num}.png`;
      }

      // 섹션별 고정 big 이미지(에셋 존재 기준)
      if (data.id === 3) return '/img/brand/bakery/home_bakery_01.png';
      if (data.id === 4) return '/img/brand/bakery/premium_bakery_01.png';
      return null;
    };

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });

    // 스텝 트리거(부모 wheel 인터셉트에서 호출)
    useImperativeHandle(ref, () => ({
      tryForwardStep: () => {
        if (splitStepRef.current === 1) return false;
        splitStepRef.current = 1;
        setSplitStep(1);
        return true;
      },
      tryReverseStep: () => {
        // 이미 기본 상태면 되돌릴 스텝 없음
        if (splitStepRef.current === 0) return false;
        // 스텝/완료 상태를 기본으로 되돌림
        splitStepRef.current = 0;
        setSplitStep(0);
        splitDoneRef.current = false;
        setIsSplitExpandedDone(false);
        setHoveredBrandIndex(null);
        setActiveBrandIndex(0);
        setTransitionBigSrc(null);
        setActiveBigSrc('');
        isBigTransitioningRef.current = false;
        rollingEnabledRef.current = false;
        setIsRollingEnabled(false);
        return true;
      },
    }));

    // split 확장 완료 시: big 이미지(첫 브랜드=0)를 먼저 보여주고, 그 페이드인이 끝난 다음 롤링 시작
    useEffect(() => {
      if (!isSplitExpandedDone) return;
      const first = getBigSrc(0);

      // big 이미지가 없으면(에셋 미구비) 롤링은 바로 활성화
      if (!first) {
        if (!rollingEnabledRef.current) {
          rollingEnabledRef.current = true;
          setIsRollingEnabled(true);
        }
        return;
      }

      // 로딩 타이밍으로 인한 깜빡임 방지를 위해 프리로드 후 페이드인 시작
      let cancelled = false;
      preloadImage(first).then(() => {
        if (cancelled) return;
        setActiveBigSrc(first);
      });
      return () => {
        cancelled = true;
      };
    }, [isSplitExpandedDone]);

    // 롤링 시작(페이드인 완료 이후)
    useEffect(() => {
      if (!isRollingEnabled) return;
      if (brands.length <= 1) return;
      const id = window.setInterval(() => {
        if (hoveredBrandIndex !== null) return;
        setActiveBrandIndex((prev) => (prev + 1) % brands.length);
      }, 3000);
      return () => window.clearInterval(id);
    }, [brands.length, hoveredBrandIndex, isRollingEnabled]);

    // 활성 브랜드 변화 시 big 이미지 "다음만 페이드인" 전환
    useEffect(() => {
      if (!isSplitExpandedDone) return;
      // 롤링이 아직 시작 전이어도(첫 페이드인 직후) hover 시에는 우측 big 이미지가 즉시 바뀌어야 함
      if (!isRollingEnabled && hoveredBrandIndex === null) return;
      const idx = hoveredBrandIndex ?? activeBrandIndex;
      const next = getBigSrc(idx);
      if (!next) return;
      if (!activeBigSrc) return;
      if (next === activeBigSrc) return;
      // 전환 중 연속 교체 요청이 들어오면 깜빡임처럼 보일 수 있어 1회 전환이 끝난 후 다음을 받습니다.
      if (isBigTransitioningRef.current) return;
      let cancelled = false;
      preloadImage(next).then(() => {
        if (cancelled) return;
        if (next === activeBigSrc) return;
        isBigTransitioningRef.current = true;
        setTransitionBigSrc(next);
      });
      return () => {
        cancelled = true;
      };
    }, [activeBrandIndex, hoveredBrandIndex, isRollingEnabled, isSplitExpandedDone, activeBigSrc]);

    const isActiveIndex = (i: number) => (hoveredBrandIndex !== null ? hoveredBrandIndex : activeBrandIndex) === i;

    // 모바일에서 섹션(패널) 높이/리듬을 일정하게 맞추기:
    // - 1번째 섹션(Heritage)은 6개(=3행)라 카드가 상대적으로 작게 보임
    // - 2/3번째처럼 1~2개만 2x2(=2행)로 두면 카드가 커져 섹션이 더 “높아 보이는” 느낌이 생김
    // → 모바일에서는 1~2개 섹션도 3행(=6슬롯) 기준으로 고정해 카드 높이를 통일
    const totalSlots = brands.length <= 2 ? 6 : brands.length;
    const mobileRows = Math.max(1, Math.ceil(totalSlots / 2)); // 2열 고정이므로 행 수 계산
    const isSingleBrand = brands.length === 1;
    // 2열 x 3행(총 6칸) 기준:
    // - 세로는 위(첫 행)에 붙임
    // - 가로는 중앙 정렬(2칸을 차지하되 실제 폭은 1칸 폭 유지)
    const singleBrandSlotIndex = 0;

    return (
      <section ref={setSectionEl} className="overflow-hidden relative w-full h-dvh snap-start snap-always">
        {/* 모바일: 위(이미지) / 아래(브랜드) / PC(lg+): 좌/우(요구사항에 따라 reverse 적용) */}
        <div className="flex flex-col w-full h-full lg:flex-row">
          {/* 좌측 패널 */}
          <motion.section
            animate={{
              flex: splitStep === 1 ? '0 0 50%' : '0 0 0%',
              opacity: splitStep === 1 ? 1 : 0,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1.0,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative z-50 w-full h-full bg-[#FBF6E8] overflow-hidden min-h-0 order-2 ${
              reverse ? 'lg:order-2' : 'lg:order-1'
            }`}
            style={{ willChange: 'flex-basis, opacity' }}
            onAnimationComplete={() => {
              // "늘어나는(좌측 패널 확장)"이 끝났을 때만 1회 처리
              if (splitStep !== 1) return;
              if (splitDoneRef.current) return;
              splitDoneRef.current = true;
              setIsSplitExpandedDone(true);
            }}
          >
            <div className="absolute size-full">
              {/* 배경(디자인 에셋) */}
              <img src="/img/brand/bakery_home_back_02.svg" alt="" className="absolute top-[100%] scale-[3]" />
            </div>

            {/* 컨텐츠: 패널 확장(최대값) 진행률 60% 지점까지 opacity 0 유지 후 1로 전환 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={splitStep === 1 ? { opacity: [0, 0, 1] } : { opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 1.0,
                times: [0, 0.6, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flex flex-col w-full h-full overflow-hidden justify-center items-center ${
                reverse ? 'lg:items-start lg:pl-[90px] lg:pr-5' : 'lg:items-end lg:pl-5 lg:pr-[90px]'
              }`}
              style={{ willChange: 'opacity' }}
            >
              {/* 모바일에서도 상/하 최소 20px 여백 유지(py-5=20px) + 부모 높이 초과 방지(min-h-0) */}
              <div className="flex flex-col gap-6 justify-start px-9 py-5 w-full h-full min-h-0 lg:px-0 lg:max-w-[510px] flex-1 max-h-[760px]">
                <div className="flex flex-col gap-2 items-center w-full text-center lg:text-left">
                  <p
                    className="gt-ultra text-[#500C08] text-[12px] w-full tracking-[-0.36px] leading-[0.95] lg:text-[26px] lg:leading-[1.1] lg:text-left"
                    dangerouslySetInnerHTML={{ __html: data.newSectionTitle }}
                  />
                  <h2
                    className="text-[#4E0C0D] text-[18px] w-full tracking-[-0.54px] leading-[1.3] font-extrabold lg:text-[63px] lg:leading-[1.3]"
                    dangerouslySetInnerHTML={{ __html: data.subtitle }}
                  />
                </div>

                {/* 모바일: 남은 높이를 전부 사용 + 행을 동일 비율로 분배해서 카드가 부모 높이에 맞게 자동 축소 */}
                <div
                  className={`grid grid-cols-2 gap-2 w-full max-w-[510px] flex-1 min-h-0 h-full ${
                    mobileRows === 1 ? 'grid-rows-1' : mobileRows === 2 ? 'grid-rows-2' : 'grid-rows-3'
                  } lg:[grid-template-rows:none]`}
                >
                  {Array.from({ length: totalSlots }).map((_, i) => {
                    const brandIndex = isSingleBrand ? (i === singleBrandSlotIndex ? 0 : -1) : i;
                    const brand = brandIndex >= 0 ? brands[brandIndex] : undefined;
                    const isActive = brand ? isActiveIndex(brandIndex) : false;
                    // 모바일: 그리드 행 높이에 맞게(=h-full) 카드도 같이 축소
                    // 데스크탑: 기존 고정 높이 유지
                    const cardHeightClass =
                      data.id === 1
                        ? 'h-full lg:h-[100%]'
                        : 'h-full lg:h-[158px]';
                    // 패딩은 고정값 유지
                    const imagePaddingClass = '';
                    return (
                      <div
                        key={brand ? brand.id : `ghost-${data.id}-${i}`}
                        data-brand-item
                        className={`relative ${brand ? 'bg-white' : 'bg-transparent'} ${cardHeightClass} min-h-0 flex items-center justify-center border lg:border-2 lg:p-4 ${
                          brand ? 'cursor-pointer' : 'pointer-events-none'
                        } ${isActive ? 'border-[#ED1B29]' : 'border-transparent transition-all duration-300'} ${
                          brand ? '' : 'opacity-0'
                        } ${
                          isSingleBrand && i === singleBrandSlotIndex
                            ? // 모바일에서만: 2칸을 차지하되, 실제 카드 폭은 "한 칸 폭"을 유지한 채 중앙 배치
                              // (gap-2 = 0.5rem)
                              'col-span-2 lg:col-span-1 w-[calc((100%-0.5rem)/2)] lg:w-full justify-self-center'
                            : ''
                        }`}
                        onClick={() => {
                          // 브랜드 카드 클릭 시 해당 브랜드 상세로 이동
                          if (!brand?.path) return;
                          router.push(brand.path);
                        }}
                        onMouseEnter={() => {
                          if (!brand) return;
                          setHoveredBrandIndex(brandIndex);
                        }}
                        onMouseLeave={() => {
                          if (!brand) return;
                          setHoveredBrandIndex(null);
                        }}
                      >
                        {brand ? (
                          <img
                            src={brand.imageUrl}
                            alt={brand.name}
                            className={`object-contain w-full h-full transition-all duration-300 max-w-[80%] lg:max-w-[80%] ${imagePaddingClass}`}
                            style={{ filter: isActive ? 'none' : 'grayscale(100%)', opacity: isActive ? 1 : 0.5 }}
                          />
                        ) : (
                          <div aria-hidden className="w-full h-full" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* 우측 패널 */}
          <motion.div
            animate={{ flex: splitStep === 1 ? '0 0 50%' : '0 0 100%' }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.0, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full h-full min-h-0 order-1 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
            style={{ willChange: 'flex-basis' }}
          >
            <img src={data.backgroundImage} alt="" className="object-cover w-full h-full" />

            {/* big 디졸브 속도(깜빡임 방지 위해 살짝 느리게) */}
            {/*
              - activeBigSrc: 첫 노출(및 active 교체 시 베이스)
              - transitionBigSrc: 다음 이미지만 페이드인 후 active로 승격
            */}
            {/**/}
            {/* big 이미지: 현재 유지 + 다음만 페이드인 */}
            {isSplitExpandedDone && activeBigSrc ? (
              <motion.img
                key={activeBigSrc}
                src={activeBigSrc}
                alt=""
                className="object-cover absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  // 첫 big 이미지가 올라온 다음부터 롤링 시작 (1회)
                  if (rollingEnabledRef.current) return;
                  if (!isSplitExpandedDone) return;
                  rollingEnabledRef.current = true;
                  setIsRollingEnabled(true);
                }}
              />
            ) : null}

            {isSplitExpandedDone && transitionBigSrc && transitionBigSrc !== activeBigSrc ? (
              <motion.img
                key={transitionBigSrc}
                src={transitionBigSrc}
                alt=""
                className="object-cover absolute top-0 left-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  setActiveBigSrc(transitionBigSrc);
                  setTransitionBigSrc(null);
                  isBigTransitioningRef.current = false;
                }}
              />
            ) : null}

            {/* 중앙 타이틀: 전환이 시작되면 80% 지점까지 페이드아웃 완료 */}
            <motion.p
              initial={{ opacity: 1 }}
              animate={splitStep === 1 ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 1.0 * 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] font-extrabold text-white text-[72px] gt-ultra mb-3 lg:mb-8 leading-[0.95] text-center lg:text-[220px]"
            >
              {data.title.replace(/<br\s*\/?>/gi, ' ')}
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }
);

BakerySplitSnapSection.displayName = 'BakerySplitSnapSection';

export type BakerySplitSnapSectionsHandle = {
  // i번째 섹션의 순행 스텝을 소비할 수 있으면 true
  tryForwardStepAt: (i: number) => boolean;
  // i번째 섹션의 역행 스텝을 되돌릴 수 있으면 true
  tryReverseStepAt: (i: number) => boolean;
};

// index.tsx(11-112)의 섹션 데이터를 이 파일로 이동
const bakeryHeritageSections: BakerySectionData[] = [
  {
    id: 1,
    title: 'Heritage',
    newSectionTitle: 'Heritage',
    subtitle: '세대를 잇는 <br class="hidden lg:block" /> 삼립 대표 헤리티지',
    backgroundImage: '/img/brand/bakery_sec_02.png',
    backgroundImageNew: '/img/brand/bakery_sec_02_01.png',
    brands: [
      { id: 1, name: '삼립호빵', imageUrl: '/img/brand/bakery/heritage_01_act.png', path: '/pub/brand/bakery/hoppang', isHighlighted: true },
      { id: 2, name: '크림빵', imageUrl: '/img/brand/bakery/heritage_02_act.png', path: '/pub/brand/bakery/creamBread', isHighlighted: true },
      { id: 3, name: '삼립호떡', imageUrl: '/img/brand/bakery/heritage_03_act.png', path: '/pub/brand/bakery/hotteok', isHighlighted: true },
      { id: 4, name: '보름달', imageUrl: '/img/brand/bakery/heritage_04_act.png', path: '/pub/brand/bakery/boreumdal', isHighlighted: true },
      { id: 5, name: '삼립약과', imageUrl: '/img/brand/bakery/heritage_05_act.png', path: '/pub/brand/bakery/yakgwa', isHighlighted: true },
      { id: 6, name: '누네띠네', imageUrl: '/img/brand/bakery/heritage_06_act.png', path: '/pub/brand/bakery/nunettine', isHighlighted: true },
    ],
  },
  {
    id: 2,
    title: 'Healthy',
    newSectionTitle: 'Healthy',
    subtitle: '매일을 위한 <br /> 건강한 선택',
    backgroundImage: '/img/brand/bakery_sec_03.png',
    backgroundImageNew: '/img/brand/bakery_sec_03_01.png',
    brands: [
      { id: 1, name: '프로젝트 H', imageUrl: '/img/brand/bakery/healthy_01.png', path: '/pub/brand/bakery/projectH', isHighlighted: true },
      { id: 2, name: '로만밀', imageUrl: '/img/brand/bakery/healthy_02.png', path: '/pub/brand/bakery/romanmeal', isHighlighted: true },
    ],
  },
  {
    id: 3,
    title: 'Home <br /> Bakery',
    newSectionTitle: 'Home Bakery',
    subtitle: '집에서 간편하게 <br class="hidden lg:block" /> 갓 구워 즐기는 <br />홈베이커리',
    backgroundImage: '/img/brand/bakery_sec_04.png',
    backgroundImageNew: '/img/brand/bakery_sec_04_01.png',
    brands: [{ id: 1, name: '레디비', imageUrl: '/img/brand/bakery.png', path: '/pub/brand/bakery/readyB', isHighlighted: true }],
  },
  {
    id: 4,
    title: 'Premium Bakery',
    newSectionTitle: 'Premium Bakery',
    subtitle: '고품질의 좋은 원료, 가장 맛있는 정통 프리미엄 베이커리',
    backgroundImage: '/img/brand/bakery_sec_05.png',
    backgroundImageNew: '/img/brand/bakery_sec_05_01.png',
    brands: [{ id: 1, name: '미각제빵소', imageUrl: '/img/brand/p-bakery.png', path: '/pub/brand/bakery/migak', isHighlighted: true }],
  },
];

type ListProps = {
  prefersReducedMotion: boolean;
  // 상위(index.tsx)에서 스냅 섹션 위치 계산을 위해 section element를 받아갈 수 있도록 콜백 제공
  setSectionElAt: (i: number, el: HTMLElement | null) => void;
};

export const BakerySplitSnapSections = forwardRef<BakerySplitSnapSectionsHandle, ListProps>(
  ({ prefersReducedMotion, setSectionElAt }, ref) => {
    const handlesRef = useRef<Array<BakerySplitSnapSectionHandle | null>>([]);

    useImperativeHandle(ref, () => ({
      tryForwardStepAt: (i: number) => {
        return handlesRef.current[i]?.tryForwardStep?.() ?? false;
      },
      tryReverseStepAt: (i: number) => {
        return handlesRef.current[i]?.tryReverseStep?.() ?? false;
      },
    }));

    const sectionsToRender = bakeryHeritageSections.slice(0, 4);

    return (
      <>
        {sectionsToRender.map((data, i) => (
          <BakerySplitSnapSection
            key={data.id}
            ref={(handle) => {
              handlesRef.current[i] = handle;
            }}
            data={data}
            prefersReducedMotion={prefersReducedMotion}
            // 짝수(2/4번째) 섹션은 좌/우 반전
            reverse={(i + 1) % 2 === 0}
            setSectionEl={(el) => setSectionElAt(i, el)}
          />
        ))}
      </>
    );
  }
);

BakerySplitSnapSections.displayName = 'BakerySplitSnapSections';
