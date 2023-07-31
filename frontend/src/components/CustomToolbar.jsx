import { Quill } from "react-quill";
import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { ProviderContext } from "../context/ProviderContext";

const CustomToolbar = () => {
  const { invite, username, showModal, setShowModal } = useContext(RoomContext);
  const { color } = useContext(ProviderContext);

  const handleClick = () => {
    setShowModal(!showModal);
  };
  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["medium", "large", "huge"];
  Quill.register(Size, true);

  // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font");
  Font.whitelist = ["sans", "monospace", "serif"];
  Quill.register(Font, true);
  return (
    <div className="flex relative h-16 bg-[#353a41] p-2 z-10">
      <div className="flex w-screen md:w-9/12 lg:w-10/12 items-center md:whitespace-pre-wrap md:overflow-hidden whitespace-nowrap overflow-x-scroll">
        <div id="toolbar" className="">
          <span className="ql-formats flex">
            <select className="ql-font !m-0 !p-0" defaultValue="arial">
              <option value="arial">Sans</option>
              <option value="monospace">Monospace</option>
              <option value="serif">Serif</option>
            </select>
            <select className="ql-size" defaultValue="medium">
              <option value="medium">Normal</option>
              <option value="large">Large</option>
              <option value="huge">Huge</option>
            </select>
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block p-3 w-10 h-10" />
            <button className="ql-clean" />
          </span>
        </div>
      </div>
      <div className="md:flex hidden justify-between md:gap-4 w-1/4 md:3/12 lg:w-2/12">
        <button
          className="bg-bluish
          text-white text-md
      font-semibold rounded-md px-4
      tracking-wide hover:bg-blue-500"
          onClick={invite}
        >
          Invite Others
        </button>
        <button
          style={{ borderColor: color }}
          className="
          bg-blacklike
          border-2
          text-white rounded-full
          py-2 px-4 hover:bg-blackhover"
          onClick={handleClick}
        >
          {username[0].toUpperCase()}
        </button>
      </div>
    </div>
  );
};
export default CustomToolbar;
