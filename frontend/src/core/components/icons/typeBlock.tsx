
export const typeBlockIcons = {

    banner: (
        <svg width="247" height="128" viewBox="0 0 247 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="245" height="126" rx="8" fill="white" />
            <rect x="1" y="1" width="245" height="126" rx="8" stroke="#E0E0E0" />
            <rect x="25" y="25" width="197" height="78" rx="4" fill="#E0E0E0" />
            <rect x="41" y="47" width="86" height="10" rx="3" fill="#F0F0F0" />
            <rect x="41" y="65" width="129" height="16" rx="4" fill="#F0F0F0" />
        </svg>
    ),

    image: (
        <svg width="247" height="128" viewBox="0 0 247 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="245" height="126" rx="8" fill="white" />
            <rect x="1" y="1" width="245" height="126" rx="8" stroke="#E0E0E0" />
            <rect x="25" y="25" width="197" height="78" rx="4" fill="#E0E0E0" />
            <rect x="96" y="36" width="56" height="56" fill="url(#pattern0_131_13616)" />
            <defs>
                <pattern id="pattern0_131_13616" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_131_13616" transform="scale(0.0078125)"/>
                </pattern>
                <image id="image0_131_13616" width="128" height="128" xlinkHref="data:image/png;base64,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"/>
            </defs>
        </svg>
    ),

    link: (
        <svg width="247" height="128" viewBox="0 0 247 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="245" height="126" rx="8" fill="white" />
            <rect x="1" y="1" width="245" height="126" rx="8" stroke="#E0E0E0" />
            <rect x="25" y="36" width="56" height="56" rx="6" fill="#E0E0E0" />
            <rect x="37" y="48" width="32" height="32" fill="url(#pattern0_131_13627)" />
            <rect x="93" y="47" width="86" height="10" rx="3" fill="#E0E0E0" />
            <rect x="93" y="65" width="129" height="16" rx="4" fill="#E0E0E0" />
            <defs>
                <pattern id="pattern0_131_13627" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_131_13627" transform="scale(0.0078125)"/>
                </pattern>
                <image id="image0_131_13627" width="128" height="128" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACAEAQAAAA5p3UDAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAACYktHRAAAqo0jMgAAAAlwSFlzAAAAYAAAAGAA8GtCzwAAAAd0SU1FB+cLFwoNIP7cBP4AAAp/SURBVHja7d1/VFRlGgfw5xn8cUyFmTtknNRc3DK12mNmrljb1mk3UI+D5i6IDqAeSdGUg1RrYgYo1Olo0XqSjlFqi65joRiRjLt6SuFEUOMxZDUZEn+1MDLDcGwEB7jv/lHbadtifnDfee8wz+dPeee573Pvd8aZue+9A0AIIYQQQgghhBBCCCGEEEIIIYQQQgYU9GUwYxpNe/usWbAvLg4mjhuHDcOGiW6AALB7OjvhaHMzPFxZqZtbWYkoy94+1usAtNVNnKix7NsHf77/ftENkz68YbH0PpGUdOtvz5/3ZrhXAWibe/fdmo2ffgp36XSi+yNeqHE4Bq2bMSP8XGOjp6EaTwMYQ9TcUlJCBz+IzJCk3riSEsbQ4xPcYwAc9z3+OBRNmya6J+Ibtmn69I6Njz3maZzHAGh+HxsruhniH3Y6Ls7TGI8BgCNjxohuhPjpX2PHehri+T3A6CFDRPdB/OPNsfP8CkAGNApAiKMAhDgKQIijAIh0tKcHdrjdIqcwSPQ+CCWY2dLCug4c0Py7rMy9+uzZWxNbWxEZ+/bcqFHu2LvuwlcMBlaamAiR48YFak4UgADAB7/9FqSXXuqcUlh4+54bNwAA4AQAJH739xElNhuU2GwA1dXszhdecBauWMEm5uTADEniPTcKAGc44coVfDU+XptisUCdF+M1bjfA9u2OxLIy+KKsDFZPncpzfvQegKe2ixfd+6dN06ZYLL4+VDJdvizXPvooXPvyS55TpABwgrEuF64zGG77Q2urvzUiy69fxwnx8fC3tjZe86QAcCLXbt2q+7D/z14dNjdD8qZNvOZJAeChwm5nhm3blCqn0xYXQ3FTE4+pUgA4wN2lpZHl168rVk/T3Q3/2LePx1wpADyM+fBDpUvKK8rLeUyVAsABvt7QoHRNt1n5mgAUAC5uPNvSonTN29+6cQOgo0PpuhQADjR/8rwY0x8oKV+XAsDBsL1RUUrXtJlGjGCO8HCl61IAOJBx8mSla2rCJk3iMVcKAA+jDQalS2q+jo/nMVUKAAds0vz5bXNHjlSsnjx4MEQmJfGYKwWAhzl6vabr2WeVKudMX7EC5o0fz2OqFABOUJOV1c6mTOlvHWd2dDSLz83lNU8KACfs77fcwtoPH7aZ/P9EYK8ID2cvffABz4UhFACu7rhj8Oq6OqfzgQd8faTTOX68Zm51NWu7916eM6QAcMbOjxnD/vjJJ+3HN21qMQ8f7nG8PHSo/UJmpvzV55/zPvgAA2hJGObV1sKpd99ll69dw39OmgTTly9n59VxXSMzDx8OkJs7dPOqVY4P3n+fbSgrkxc2NERmt7YCMHbtwG23DT49YQJoDQZnWEIC2seOhYgA7TdPAxy/Ky2Fw08+KXon9tmEMydHG52Xh8jYD/O2R0RgqsnE3lXx1c11vb3QJMuwcPBgLvXjDx6UTi5Y0NeQ4P8v4NKOHbrxubk/PvgAAJK+o+PmmgULoOH0adFT/EUPhoVxO/heCuoAYOSZM65jzzzzS3+PinW5WE5SEiZ9vxSb/J+gDQBmd3Wxa4sWjc3q7OxrnP7Y2bNsQmam6PmqVdAGgA3KyJD09fXejJW279yJ0/bvFz1nNQrOAKQfOiRt37nTp8c0padD28WLoqeuNkEXAJxw5cqg36Sl+fo4HTqdoDcaoa63V3QPahJcAWiSZVyRmhqebbf783BJX1UF6fn5ottQk+AKwIb8fG3+8eP9KaFrys2Fko8/Ft2KWgRNADCvtlZn3ry533VQlqE6JQVqHA7RPalBkASgowOHL1yImu5uJapJpsuX2adPPSW6KzUIkgCsWqXNv3BByYr6zaWluP/tt0V3Jpr6A/DIrl2SxOeyqJu/zsjAtHPnRLcokroD8LLVKkdnZPAqHxXrcrGdCQmY3dUlulVR1BuA/d3dzGY0KnmR5c+R9PX18nMbNohuVxT1BmDn88/rd3/2WSA2Jf2qsBAsfC6+VDtVBgBTzGbdqVdfDdj2kLEhu5cvx0wFr+nLamzE+U8/DekPPYSZBgNc3bsXHP97yloN1LciaKPN1p28ZMlPz+/zNqLEZrNXpKaio7IS+n0NXkWFe2FiYlSsy/XDP+0pL3feX1oqp5lMotcA/Ji6XgEcjMGIJUtGJSp/da039HOOHsXX+ndnD4w8c8Zd95OD/z3tqUOHYCG/N7X+UFUAsLWwUHrlyBGRc9Bu37AB1/j33gOzu7pgr9H4cwf/vySpqAgNJpPIHn9MRQGor3fOFP9uHDXd3ZrVRiPe6cenj4NZWbokL5agnVy5Ui2nplURAIx1ueSmhIRoVMfn8YiZVivY1671qYeojz7SthQVeTNWh04nLk5OVsOpaVUEQC7LyIh8UF3fyOlw924A776BxJirVwfdm5rqyxtXXd3Jk7C1oEB0n8IDgIdLS/WjVfqdPFu1Cqo8nINokmV8LTV1pMX3mznqzHl5OKq6WmSLggNw6RLO9311T6BI+o4OFrZoUZ+3dH+7oEA7+9gxf+qjpqcHuo1GsDudonoUF4C63l5gixdrte3twubgBf2cmhp4Jzn5584X4NbiYl3Riy/2p74Om5th48qVovoTFgD2xJYtkr6qStT2fSF9feCAfH7qVLi0YwdAVRXmvPceZhoMuoK0NF9+qPkX65tMJnhk1y4RvQn6JrCqSoL+r+4JJP2xs2dhyurVvOq7t61ZMzQtJoa9NXFiIPsK/CuA3elEXXIyoviPQGoSFetyYfzixYH+CZnAB+BQeroOm5sDvt0goE2xWOD9wH4ZFtAA4NbiYuk5ukKnL9+dBa2oCNT2AheAl63W3vp16wK2vSCFyNiQtcuWKXpqug+BCcCWmzc11oQE3qt7BooRJTab/OaSJYFYPxCQAOC29eu1B0+dCsS2Bgr9MLMZHn79dd7b4R4ATDGbtcC/kYFI98369fAe3ycO3wAIWt0zUKDm5s2w+xIS/Do17SV+AXAwBluWLRO1umegiJhptTLk9+aZWwDwtW3bJClwH2cGMsleXMzrBhd8AvCGxaLdnp3Nda+Emqb0dDin/BdoigcAY10uuXbRou9+ApUoRYdOJzQZjXC0p0fJuooHQM5Zuzay/KuvArdrQoeUXF3NEpW9wYWyAfjyxAlptpjTmqFCYgUFkNXYqFQ9ZQPQ8+ab9JGPL9S43XhYuSeZogHA41evBn6XhKA3lNvPigaAvTN/fuD3RuhhZfPmKVVL2RVBVRkZjnkREfjXPXvk2VZrWAvdolUpcu/IkTB78mRYsHIlLFfuB6SUDYCECCeWLmWwdCl+A9D/1XLkBwgAHC6aE35dABGLAhDiKAAhjgIQ4igAIc5jAPAqndQJVt4cO8+vALOuXBHdCPHT8EuXPA3x/Aowp7JSdB/EP6jzfOw8BiBi1vHjmFdbK7oZ4htMrKmJ+MTzbfE9vwIgY2GVRiPdXj2IVNjtmtzkZG/OzHr1KSD8XGNjrz4mBl784gvRvZG+YVFd3aD8mJiImVarV+N9Kc6YRtP+l9hYuBgXB2nR0dgwbJjohgkAu6ezE966cAGajxzR1ZjNtCaDEEIIIYQQQgghhBBCCCGEEEIIISSE/Qdc/Z0/wQKkuAAAAABJRU5ErkJggg=="/>
            </defs>
        </svg>
    ),

    text: (
        <svg width="247" height="128" viewBox="0 0 247 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="245" height="126" rx="8" fill="white" />
            <rect x="1" y="1" width="245" height="126" rx="8" stroke="#E0E0E0" />
            <rect x="25" y="35" width="86" height="10" rx="3" fill="#E0E0E0" />
            <rect x="25" y="53" width="197" height="16" rx="4" fill="#E0E0E0" />
            <rect x="25" y="77" width="197" height="16" rx="4" fill="#E0E0E0" />
        </svg>
    )

}