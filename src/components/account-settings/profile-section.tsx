const ProfileSection = () => {
    return (
        <div><div className="bg-white rounded-2xl shadow-[0px_4px_50px_0px_rgba(84,110,116,0.08)] p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full bg-[#009CA6] flex items-center justify-center">
                        <span className="text-white text-[20px] sm:text-[24px] font-semibold"></span></div>
                    <h2 className="text-[24px] sm:text-[30px] font-normal text-[#525F69]"></h2>
                </div><div className="flex flex-wrap items-center gap-3 sm:gap-8 ">
                    <div className="flex items-center gap-2">
                        <img alt="Credits" className="w-[24px] h-[24px] sm:w-[24px] sm:h-[24px]" src="/coin.png" />
                        <span className="text-[16px] sm:text-[16px] font-semibold text-[#009CA6]">Total Credits:</span>
                        <span className="text-[20px] sm:text-[24px] font-bold text-[#525F69]">0</span></div>
                    <div className="flex items-center gap-2 bg-[#009CA6] px-4 py-2 rounded-[100px] border-[0.5px] border-[#94E0E5] w-full sm:w-auto justify-center">
                        <img alt="Subscription" className="w-[24px] h-[24px] sm:w-[24px] sm:h-[24px]" src="/star.png" />
                        <span className="text-white text-[20px] sm:text-[24px] font-semibold">Active subscription</span>
                    </div>
                </div>
            </div>
        </div>
            <div className="bg-white rounded-2xl shadow-[0px_4px_50px_0px_rgba(84,110,116,0.08)] p-6 sm:p-8 mb-6">
                <h3 className="text-[24px] sm:text-[30px] font-semibold text-[#009CA6] mb-6">Personal information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div>
                        <p className="block text-[16px] sm:text-[16px] font-semibold text-[#009CA6] mb-[8px]">Full name</p>
                        <p className="text-[20px] sm:text-[24px] text-[#525F69]"></p></div><div>
                        <p className="block text-[16px] sm:text-[16px] font-semibold text-[#009CA6] mb-[8px]">Email Address</p>
                        <p className="text-[20px] sm:text-[24px] text-[#525F69]">--</p></div>
                    <div><p className="block text-[16px] sm:text-[16px] font-semibold text-[#009CA6] mb-[8px]">Organization</p>
                        <p className="text-[20px] sm:text-[24px] text-[#525F69]">--</p></div><div>
                        <p className="block text-[16px] sm:text-[16px] font-semibold text-[#009CA6] mb-[8px]">Role</p>
                        <p className="text-[20px] sm:text-[24px] text-[#525F69]">--</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSection;