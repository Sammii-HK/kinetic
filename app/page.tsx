import DemoCard from "./components/DemoCard";
import SpringPlayground from "./components/SpringPlayground";
import LayoutShuffle from "./components/LayoutShuffle";
import GestureCards from "./components/GestureCards";
import StaggerReveal from "./components/StaggerReveal";
import MorphingShapes from "./components/MorphingShapes";
import ScrollParallax from "./components/ScrollParallax";
import PathDrawing from "./components/PathDrawing";
import MagneticHover from "./components/MagneticHover";
import DragReorder from "./components/DragReorder";
import FlipCard from "./components/FlipCard";
import ElasticCounter from "./components/ElasticCounter";
import AnimatedTabs from "./components/AnimatedTabs";
import CountdownRing from "./components/CountdownRing";
import ParticleBurst from "./components/ParticleBurst";
import Accordion from "./components/Accordion";
import TextScramble from "./components/TextScramble";
import CursorTrail from "./components/CursorTrail";
import ProgressSteps from "./components/ProgressSteps";
import FloatingDock from "./components/FloatingDock";
import Typewriter from "./components/Typewriter";
import NotificationStack from "./components/NotificationStack";
import SpotlightCard from "./components/SpotlightCard";
import InfiniteMarquee from "./components/InfiniteMarquee";
import GravityBalls from "./components/GravityBalls";
import AnimatedBorder from "./components/AnimatedBorder";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="text-center py-16 px-6">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Kinetic
        </h1>
        <p className="mt-3 text-white/50 text-lg max-w-md mx-auto">
          An interactive showcase of spring physics, layout animations, and
          gesture-driven interactions built with Framer Motion.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <DemoCard
          title="Spring Physics"
          description="Drag the ball and watch spring dynamics in real time. Adjust stiffness, damping, and mass."
        >
          <SpringPlayground />
        </DemoCard>

        <DemoCard
          title="Layout Shuffle"
          description="Shared layout animations with automatic interpolation between positions."
        >
          <LayoutShuffle />
        </DemoCard>

        <DemoCard
          title="Gesture Cards"
          description="Swipe cards to dismiss them. Velocity and offset determine the threshold."
        >
          <GestureCards />
        </DemoCard>

        <DemoCard
          title="Stagger Reveal"
          description="Orchestrated entrance animations with configurable variants and timing."
        >
          <StaggerReveal />
        </DemoCard>

        <DemoCard
          title="Morphing Shapes"
          description="SVG path morphing with spring-based transitions between geometric forms."
        >
          <MorphingShapes />
        </DemoCard>

        <DemoCard
          title="Path Drawing"
          description="SVG stroke animation using pathLength for a draw-on reveal effect."
        >
          <PathDrawing />
        </DemoCard>

        <DemoCard
          title="Magnetic Hover"
          description="Buttons that follow your cursor within a magnetic radius using spring physics."
        >
          <MagneticHover />
        </DemoCard>

        <DemoCard
          title="Drag to Reorder"
          description="Sortable list with automatic layout animation on reorder."
        >
          <DragReorder />
        </DemoCard>

        <DemoCard
          title="3D Flip Cards"
          description="Perspective-based card flip with spring transitions on click."
        >
          <FlipCard />
        </DemoCard>

        <DemoCard
          title="Elastic Counter"
          description="Numbers that spring between values with physics-based interpolation."
        >
          <ElasticCounter />
        </DemoCard>

        <DemoCard
          title="Animated Tabs"
          description="Sliding tab indicator using shared layoutId for seamless transitions."
        >
          <AnimatedTabs />
        </DemoCard>

        <DemoCard
          title="Countdown Ring"
          description="Circular progress ring with spring-animated countdown timer."
        >
          <CountdownRing />
        </DemoCard>

        <DemoCard
          title="Particle Burst"
          description="Click anywhere to spawn an explosion of physics-driven particles."
        >
          <ParticleBurst />
        </DemoCard>

        <DemoCard
          title="Accordion"
          description="Collapsible sections with spring-animated height transitions."
        >
          <Accordion />
        </DemoCard>

        <DemoCard
          title="Text Scramble"
          description="Characters scramble through random glyphs before resolving into the target word."
        >
          <TextScramble />
        </DemoCard>

        <DemoCard
          title="Cursor Trail"
          description="Rainbow trail of circles following the cursor with staggered spring delay."
        >
          <CursorTrail />
        </DemoCard>

        <DemoCard
          title="Progress Steps"
          description="Multi-step progress bar with spring-animated transitions between stages."
        >
          <ProgressSteps />
        </DemoCard>

        <DemoCard
          title="Floating Dock"
          description="macOS-style dock with proximity-based scale using spring physics."
        >
          <FloatingDock />
        </DemoCard>

        <DemoCard
          title="Typewriter"
          description="Text appears character by character with variable speed and a blinking cursor."
        >
          <Typewriter />
        </DemoCard>

        <DemoCard
          title="Notification Stack"
          description="Toast notifications that stack, animate in, and auto-dismiss with layout transitions."
        >
          <NotificationStack />
        </DemoCard>

        <DemoCard
          title="Spotlight Card"
          description="A radial gradient that follows your cursor across the card surface."
        >
          <SpotlightCard />
        </DemoCard>

        <DemoCard
          title="Infinite Marquee"
          description="Seamlessly looping ticker with configurable speed and direction."
        >
          <InfiniteMarquee />
        </DemoCard>

        <DemoCard
          title="Gravity Balls"
          description="Balls that drop and bounce with squash and stretch on impact."
        >
          <GravityBalls />
        </DemoCard>

        <DemoCard
          title="Animated Border"
          description="Rotating conic gradient border with colour and speed controls."
        >
          <AnimatedBorder />
        </DemoCard>

        <DemoCard
          title="Scroll Parallax"
          description="Multi-layer parallax driven by scroll position using useScroll and useTransform."
        >
          <ScrollParallax />
        </DemoCard>
      </main>

      <footer className="text-center py-8 text-white/20 text-sm border-t border-white/5">
        Built with Next.js and Framer Motion
      </footer>
    </div>
  );
}
