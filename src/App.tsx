import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Brief from './pages/Brief';
import Plan from './pages/Plan';
import Design from './pages/Design';
import Flow from './pages/Flow';

// Prototype screens
import Launcher from './pages/prototype/Launcher';
import Splash from './pages/prototype/Splash';
import Landing from './pages/prototype/Landing';
import Onboarding from './pages/prototype/Onboarding';
import PlanSelect from './pages/prototype/PlanSelect';
import Invite from './pages/prototype/Invite';
import Join from './pages/prototype/Join';
import TeamHome from './pages/prototype/TeamHome';
import IdeaNew from './pages/prototype/IdeaNew';
import IdeasBoard from './pages/prototype/IdeasBoard';
import IdeaDetail from './pages/prototype/IdeaDetail';
import Vote from './pages/prototype/Vote';
import VoteResult from './pages/prototype/VoteResult';
import Mediate from './pages/prototype/Mediate';
import FinalBrief from './pages/prototype/FinalBrief';
import Notifications from './pages/prototype/Notifications';
import IdeaEdit from './pages/prototype/IdeaEdit';
import Chat from './pages/prototype/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brief" element={<Brief />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/design" element={<Design />} />
        <Route path="/flow" element={<Flow />} />

        {/* Prototype */}
        <Route path="/prototype" element={<Launcher />} />
        <Route path="/prototype/splash" element={<Splash />} />
        <Route path="/prototype/landing" element={<Landing />} />
        <Route path="/prototype/onboarding" element={<Onboarding />} />
        <Route path="/prototype/plan" element={<PlanSelect />} />
        <Route path="/prototype/invite" element={<Invite />} />
        <Route path="/prototype/join" element={<Join />} />
        <Route path="/prototype/team" element={<TeamHome />} />
        <Route path="/prototype/idea/new" element={<IdeaNew />} />
        <Route path="/prototype/ideas" element={<IdeasBoard />} />
        <Route path="/prototype/idea/:id/edit" element={<IdeaEdit />} />
        <Route path="/prototype/idea/:id" element={<IdeaDetail />} />
        <Route path="/prototype/vote/result" element={<VoteResult />} />
        <Route path="/prototype/vote" element={<Vote />} />
        <Route path="/prototype/mediate" element={<Mediate />} />
        <Route path="/prototype/brief" element={<FinalBrief />} />
        <Route path="/prototype/chat" element={<Chat />} />
        <Route path="/prototype/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
