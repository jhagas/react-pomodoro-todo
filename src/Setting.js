import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function ModalSetting(props) {
  const [settings, setSettings] = props.setting;
  const [changes, setChanges] = useState(settings);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setChanges(settings);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleSaving(event) {
    event.preventDefault();
    setSettings(changes);
    setIsOpen(false);
  }

  return (
    <>
      <div
        onClick={openModal}
        className="rounded-full bg-gray6 w-8 h-8 flex flex-column justify-center items-center hover:bg-gray3 cursor-pointer transition-colors group"
      >
        <IoSettingsOutline
          size="18px"
          className="group-hover:animate-wiggle group-hover:text-white transition-colors"
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-90" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block text-white w-full max-w-xl py-8 px-11 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray6 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900"
                >
                  Session Length
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    The length of each session type in minutes. Changes apply to
                    the next session of each type.
                  </p>
                </div>

                <form className="my-4" onSubmit={handleSaving}>
                  <div className="flex flex-col gap-[0.2rem] rounded-xl overflow-hidden shadow-lg">
                    <div className="flex flex-row justify-between text-base bg-gray5 py-2 px-4 items-center">
                      <label>Lap length</label>
                      <div className="flex flex-row gap-[0.1rem]">
                        <input
                          value={changes.lapLength}
                          onChange={(event) =>
                            setChanges({
                              ...changes,
                              lapLength: event.target.value,
                            })
                          }
                          className="outline-none bg-gray3 h-8 rounded-l-lg text-center w-12"
                          type="number"
                          name="lapLength"
                          inputMode="none"
                          id="lap"
                          min="1"
                          max="99"
                        />
                        <div
                          onClick={() => {
                            if (JSON.parse(changes.lapLength) > 1) {
                              setChanges({
                                ...changes,
                                lapLength:
                                  JSON.parse(changes.lapLength) - 1,
                              });
                            }
                          }}
                          className="w-8 bg-gray3 flex flex-row justify-center items-center cursor-pointer"
                        >
                          <FiMinus size="14px" />
                        </div>
                        <div
                          onClick={() => {
                            if (
                              JSON.parse(changes.lapLength) < 99
                            ) {
                              setChanges({
                                ...changes,
                                lapLength:
                                  JSON.parse(changes.lapLength) + 1,
                              });
                            }
                          }}
                          className="w-8 bg-gray3 flex flex-row justify-center items-center cursor-pointer rounded-r-lg"
                        >
                          <FiPlus size="14px" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between text-base bg-gray5 py-2 px-4 items-center">
                      <label>Short break length</label>
                      <div className="flex flex-row gap-[0.1rem]">
                        <input
                          value={changes.shortBreakLength}
                          onChange={(event) =>
                            setChanges({
                              ...changes,
                              shortBreakLength: event.target.value,
                            })
                          }
                          className="outline-none bg-gray3 h-8 rounded-l-lg text-center w-12"
                          type="number"
                          inputMode="none"
                          name="lapLength"
                          id="lap"
                          min="1"
                          max="99"
                        />
                        <div
                          onClick={() => {
                            if (JSON.parse(changes.shortBreakLength) > 1) {
                              setChanges({
                                ...changes,
                                shortBreakLength:
                                  JSON.parse(changes.shortBreakLength) - 1,
                              });
                            }
                          }}
                          className="w-8 bg-gray3 flex flex-row justify-center items-center cursor-pointer"
                        >
                          <FiMinus size="14px" />
                        </div>
                        <div
                          onClick={() => {
                            if (
                              JSON.parse(changes.shortBreakLength) < 99
                            ) {
                              setChanges({
                                ...changes,
                                shortBreakLength:
                                  JSON.parse(changes.shortBreakLength) + 1,
                              });
                            }
                          }}
                          className="w-8 bg-gray3 flex flex-row justify-center items-center cursor-pointer rounded-r-lg"
                        >
                          <FiPlus size="14px" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between text-base bg-gray5 py-2 px-4 items-center">
                      <label>Long break length</label>
                      <div className="flex flex-row gap-[0.1rem]">
                        <input
                          value={changes.longBreakLength}
                          onChange={(event) =>
                            setChanges({
                              ...changes,
                              longBreakLength: event.target.value,
                            })
                          }
                          className="outline-none bg-gray3 h-8 rounded-l-lg text-center w-12"
                          type="number"
                          name="lapLength"
                          inputMode="none"
                          id="lap"
                          min="1"
                          max="99"
                        />
                        <div
                          onClick={() => {
                            if (JSON.parse(changes.longBreakLength) > 1) {
                              setChanges({
                                ...changes,
                                longBreakLength:
                                  JSON.parse(changes.longBreakLength) - 1,
                              });
                            }
                          }}
                          className="w-8 bg-gray3 flex flex-row justify-center items-center cursor-pointer"
                        >
                          <FiMinus size="14px" />
                        </div>
                        <div
                          onClick={() => {
                            if (
                              JSON.parse(changes.longBreakLength) < 99
                            ) {
                              setChanges({
                                ...changes,
                                longBreakLength:
                                  JSON.parse(changes.longBreakLength) + 1,
                              });
                            }
                          }}
                          className="w-8 bg-gray3 flex flex-row justify-center items-center cursor-pointer rounded-r-lg"
                        >
                          <FiPlus size="14px" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 rounded-xl overflow-hidden mt-6 shadow-lg">
                    <div className="flex flex-row justify-between text-base bg-gray5 py-2 px-4 items-center">
                      <label>Session until long break</label>
                      <div className="flex flex-row gap-[0.1rem]">
                        <input
                          value={changes.sessionUntilLongBreak}
                          onChange={(event) =>
                            setChanges({
                              ...changes,
                              sessionUntilLongBreak: event.target.value,
                            })
                          }
                          className="outline-none bg-gray3 h-8 rounded-l-lg text-center w-12"
                          type="number"
                          name="lapLength"
                          id="lap"
                          min="2"
                          inputMode="none"
                          max="16"
                        />
                        <div
                          onClick={() => {
                            if (JSON.parse(changes.sessionUntilLongBreak) > 1) {
                              setChanges({
                                ...changes,
                                sessionUntilLongBreak:
                                  JSON.parse(changes.sessionUntilLongBreak) - 1,
                              });
                            }
                          }}
                          className="w-8 bg-gray3 flex flex-row justify-center items-center cursor-pointer"
                        >
                          <FiMinus size="14px" />
                        </div>
                        <div
                          onClick={() => {
                            if (
                              JSON.parse(changes.sessionUntilLongBreak) < 16
                            ) {
                              setChanges({
                                ...changes,
                                sessionUntilLongBreak:
                                  JSON.parse(changes.sessionUntilLongBreak) + 1,
                              });
                            }
                          }}
                          className="w-8 bg-gray3 flex flex-row justify-center items-center cursor-pointer rounded-r-lg"
                        >
                          <FiPlus size="14px" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-row gap-2">
                    <button
                      type="submit"
                      className="inline-flex bg-blue hover:bg-opacity-70 transition-colors justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                      Save Settings
                    </button>
                    <button
                      type="button"
                      className="inline-flex bg-gray5 hover:bg-opacity-70 transition-colors justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
