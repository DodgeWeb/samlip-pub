import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import clsx from "clsx";

type MotionType = "fadeUp" | "slideLeft" | "zoomIn" | "slideUp" | "fade";
type TriggerType = "mount" | "scroll";

export function MotionBox({
  children,
  type = "fadeUp",
  delay = 0,
  duration = 0.5,
  trigger = "scroll",
  viewport = { once: true, amount: 0 },
  className = "",
}: {
  children: React.ReactNode;
  type?: MotionType;
  delay?: number;
  duration?: number;
  trigger?: TriggerType;
  viewport?: {
    once?: boolean;
    amount?: number;
  };
  className?: string;
}) {
  const ctxRef = useRef<gsap.Context | null>(null);

  const variants = {
    fadeUp: { initial: { opacity: 0, y: 80 }, animate: { opacity: 1, y: 0 } },
    slideLeft: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    zoomIn: { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 } },
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    slideUp: { initial: { opacity: 1, y: 90, distance: 300, smoothness:10 }, animate: { opacity: 1, y: 0, distance: 0 } },
  };

  const isScrollTrigger = trigger === "scroll";
  
  // slideUp 타입일 때
  const getTransition = () => {
    if (type === "slideUp") {
      return { duration, delay, ease: "easeOut" as const };
    }
    return { duration, delay, ease: "easeOut" as const };
  };

  // ScrollTrigger를 사용하는 경우 cleanup
  useEffect(() => {
    // 현재는 framer-motion만 사용하지만, 나중에 ScrollTrigger를 추가할 경우를 대비
    // ScrollTrigger를 사용하지 않으면 ctx는 null로 유지
    
    return () => {
      // ★ 오직 ctx.revert()만 사용 - React unmount 전에 동기적으로 실행
      try {
        if (ctxRef.current) {
          ctxRef.current.revert();
          ctxRef.current = null;
        }
      } catch (e) {
        // 이미 정리된 경우 무시
      }
    };
  }, []);

  return (
    <motion.div
      className={clsx(className, 'w-full')}
      initial={variants[type].initial}
      animate={isScrollTrigger ? undefined : variants[type].animate}
      whileInView={isScrollTrigger ? variants[type].animate : undefined}
      viewport={isScrollTrigger ? viewport : undefined}
      transition={getTransition()}
    >
      {children}
    </motion.div>
  );
}