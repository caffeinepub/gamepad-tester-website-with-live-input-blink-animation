import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TesterSeoContentBlock from './TesterSeoContentBlock';

const FAQ_ITEMS = [
  {
    question: 'Can a game pad tester identify specific button malfunctions?',
    answer:
      'Yes, gamepadtester.online can pinpoint which buttons on a game controller may be malfunctioning, helping users troubleshoot and fix the issue.',
  },
  {
    question: 'Can a game pad tester be used to test wireless game controllers?',
    answer:
      'Yes, our gamepadtester.online web app supports testing both wired and wireless game controllers, providing a comprehensive testing solution.',
  },
  {
    question: 'Where can I find a reliable game pad tester software?',
    answer:
      'You can find game pad tester software online through reputable sources or gaming forums. Be sure to read reviews and recommendations before downloading any software. you can also use gamepadtester.online web application.our app is able to diagnose all the latest gamepad problems, because we update our website to match the latest gamepad technology and functions.',
  },
  {
    question: 'How can I test if my controller is not working?',
    answer:
      'simply you just go to gamepadtester.online web application and connect your game pad to your PC and check your controller working or not.',
  },
  {
    question: 'How do I check my controller vibration sound?',
    answer:
      "Gamepadtester.online can also check the sound and vibration testing to your controller you don't need any other software for this test.",
  },
];

const GAMEPAD_LIST = [
  'Xbox Wireless Controller',
  'PlayStation DualShock 4',
  'Nintendo Switch Pro Controller',
  'Xbox Elite Wireless Controller Series 2',
  'PlayStation DualSense',
  'Logitech F310',
  'Logitech F710',
  'Razer Wolverine Ultimate',
  'Razer Raiju',
  '8Bitdo SN30 Pro+',
  'Steam Controller',
  'Hori Fighting Commander',
  'PowerA Enhanced Wired Controller',
  'PowerA Fusion Pro',
  'Nacon Revolution Unlimited Pro Controller',
  'Scuf Infinity4PS Pro',
  'Scuf Impact',
  'Scuf Prestige',
  'Astro C40 TR',
  'Thrustmaster GPX LightBack',
  'PDP Faceoff Deluxe+ Audio Wired Controller',
  'GameSir T4 Pro',
  'GameSir G4s',
  'SteelSeries Stratus Duo',
  'SteelSeries Nimbus+',
  'Amazon Luna Controller',
  'Mad Catz C.T.R.L.R',
  'Snakebyte Game:Pad 4S',
  'Hyperkin X91',
  'Retro-Bit Sega Genesis 8-Button Arcade Pad',
];

export default function TesterPostContent() {
  return (
    <div className="space-y-8">
      {/* SEO/Marketing Content Block */}
      <TesterSeoContentBlock />

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Supported Gamepads List */}
      <Card>
        <CardHeader>
          <CardTitle>Some Game Pads List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {GAMEPAD_LIST.map((gamepad, index) => (
              <div
                key={index}
                className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm text-foreground"
              >
                {gamepad}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer Links */}
      <div className="flex flex-wrap items-center justify-center gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">
          Privacy policy
        </a>
        <span>•</span>
        <a href="#" className="hover:text-foreground transition-colors">
          Contact us
        </a>
        <span>•</span>
        <a href="#" className="hover:text-foreground transition-colors">
          T&C
        </a>
      </div>
    </div>
  );
}
